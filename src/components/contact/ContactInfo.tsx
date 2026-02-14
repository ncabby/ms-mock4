interface ContactInfoProps {
  phone: string;
  phoneTel: string;
  fax: string;
  email: string;
  address: {
    company: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export default function ContactInfo({
  phone,
  phoneTel,
  fax,
  email,
  address,
}: ContactInfoProps) {
  return (
    <div className="rounded-lg border border-navy-200 bg-white p-8 shadow-sm">
      <div className="space-y-4">
        {/* Phone */}
        <div className="flex items-start gap-3">
          <svg
            className="mt-1 h-5 w-5 shrink-0 text-accent-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-navy-500">Phone</p>
            <a
              href={phoneTel}
              className="text-lg text-accent-500 hover:text-accent-600"
            >
              {phone}
            </a>
          </div>
        </div>

        {/* Fax */}
        <div className="flex items-start gap-3">
          <svg
            className="mt-1 h-5 w-5 shrink-0 text-accent-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-navy-500">Fax</p>
            <p className="text-lg text-navy-800">{fax}</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start gap-3">
          <svg
            className="mt-1 h-5 w-5 shrink-0 text-accent-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-navy-500">Email</p>
            <a
              href={`mailto:${email}`}
              className="text-lg text-accent-500 hover:text-accent-600"
            >
              {email}
            </a>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3">
          <svg
            className="mt-1 h-5 w-5 shrink-0 text-accent-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-navy-500">Address</p>
            <p className="text-lg text-navy-800">{address.company}</p>
            <p className="text-navy-700">{address.street}</p>
            <p className="text-navy-700">
              {address.city}, {address.state} {address.zip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
