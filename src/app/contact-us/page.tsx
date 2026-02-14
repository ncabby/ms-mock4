import ContactInfo from "@/components/contact/ContactInfo";
import contactData from "../../../content/pages/contact.json";

export default function ContactUsPage() {
  const fullAddress = `${contactData.address.company}, ${contactData.address.street}, ${contactData.address.city}, ${contactData.address.state} ${contactData.address.zip}`;
  const mapQuery = encodeURIComponent(fullAddress);

  return (
    <main>
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="mb-8 text-4xl font-bold text-navy-900">
          {contactData.pageTitle}
        </h1>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Contact Info */}
          <div>
            <ContactInfo
              phone={contactData.phone}
              phoneTel={contactData.phoneTel}
              fax={contactData.fax}
              email={contactData.email}
              address={contactData.address}
            />

            {/* Parking note */}
            <div className="mt-6 rounded border border-navy-200 bg-navy-50 p-4">
              <p className="text-sm leading-relaxed text-navy-700">
                <span className="font-semibold">Parking:</span>{" "}
                {contactData.parkingNote}
              </p>
            </div>
          </div>

          {/* Map */}
          <div className="overflow-hidden rounded-lg border border-navy-200 shadow-sm">
            <iframe
              src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing ${contactData.address.company} location`}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
