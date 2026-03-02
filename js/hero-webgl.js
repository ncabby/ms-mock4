/* ===================================================================
   Hero WebGL Background — Topographic Neon Lines with Ground Perspective
   Adapted for Main Sail brand palette (#204B57, #125E8A, #197BBD)
   =================================================================== */

(function () {
  'use strict';

  // Bail on reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  var gl = canvas.getContext('webgl');
  if (!gl) {
    // WebGL unsupported — CSS gradient fallback stays visible
    canvas.style.display = 'none';
    return;
  }

  /* ---- Shaders ---- */

  var vsSource = [
    'attribute vec2 position;',
    'void main() {',
    '  gl_Position = vec4(position, 0.0, 1.0);',
    '}'
  ].join('\n');

  var fsSource = [
    'precision highp float;',
    'uniform float u_time;',
    'uniform vec2 u_resolution;',
    '',
    'float hash(vec2 p) {',
    '  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);',
    '}',
    '',
    'float noise(vec2 p) {',
    '  vec2 i = floor(p);',
    '  vec2 f = fract(p);',
    '  vec2 u = f * f * (3.0 - 2.0 * f);',
    '  return mix(',
    '    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),',
    '    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),',
    '    u.y',
    '  );',
    '}',
    '',
    'void main() {',
    '  vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);',
    '',
    '  // Ground perspective simulation',
    '  float depth = 1.0 / (uv.y + 1.15);',
    '  vec2 gridUv = vec2(uv.x * depth, depth + u_time * 0.15);',
    '',
    '  // Layered procedural noise for terrain',
    '  float n = noise(gridUv * 3.5);',
    '  float ripples = sin(gridUv.y * 18.0 + n * 8.0 + u_time * 0.5);',
    '',
    '  // Neon topographic lines',
    '  float topoLine = smoothstep(0.03, 0.0, abs(ripples));',
    '',
    '  // Main Sail brand palette',
    '  vec3 baseColor   = vec3(0.125, 0.294, 0.341);', // #204B57
    '  vec3 accentColor = vec3(0.071, 0.369, 0.541);', // #125E8A
    '  vec3 neonColor   = vec3(0.098, 0.482, 0.741);', // #197BBD
    '',
    '  // Composite',
    '  vec3 finalColor = mix(baseColor, accentColor, n * 0.7);',
    '  finalColor += topoLine * neonColor * depth * 0.55;',
    '',
    '  // Subtle secondary glow along lines',
    '  float softGlow = smoothstep(0.15, 0.0, abs(ripples));',
    '  finalColor += softGlow * accentColor * depth * 0.15;',
    '',
    '  // Horizon fog / fade',
    '  float fade = smoothstep(0.1, -1.0, uv.y);',
    '  finalColor *= (1.0 - length(uv) * 0.38) * (1.0 - fade);',
    '',
    '  gl_FragColor = vec4(finalColor, 1.0);',
    '}'
  ].join('\n');

  /* ---- Compile & Link ---- */

  function createShader(type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  var vs = createShader(gl.VERTEX_SHADER, vsSource);
  var fs = createShader(gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) { canvas.style.display = 'none'; return; }

  var program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('Program link error:', gl.getProgramInfoLog(program));
    canvas.style.display = 'none';
    return;
  }

  gl.useProgram(program);

  /* ---- Full-screen quad ---- */

  var buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,  1, -1, -1,  1,
    -1,  1,  1, -1,  1,  1
  ]), gl.STATIC_DRAW);

  var posAttrib = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(posAttrib);
  gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);

  var timeLoc = gl.getUniformLocation(program, 'u_time');
  var resLoc  = gl.getUniformLocation(program, 'u_resolution');

  /* ---- Resize handling ---- */

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var needsResize = true;

  function resize() { needsResize = true; }
  window.addEventListener('resize', resize, { passive: true });

  /* ---- Render loop ---- */

  var rafId;

  function render(time) {
    if (needsResize) {
      var rect = canvas.getBoundingClientRect();
      var w = Math.round(rect.width * dpr);
      var h = Math.round(rect.height * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      needsResize = false;
    }

    gl.uniform1f(timeLoc, time * 0.001);
    gl.uniform2f(resLoc, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    rafId = requestAnimationFrame(render);
  }

  rafId = requestAnimationFrame(render);

  /* ---- Cleanup on page hide (saves battery on tab switch) ---- */

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      cancelAnimationFrame(rafId);
    } else {
      needsResize = true;
      rafId = requestAnimationFrame(render);
    }
  });
})();
