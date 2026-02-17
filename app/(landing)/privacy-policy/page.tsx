import PageHeader from "../components/ui/page-header";

const PrivacyPolicyPage = () => {
  const lastUpdated = "February 16, 2026";

  return (
    <main>
      <div className="container min-h-screen mx-auto sm:px-6 pt-30 xl:pt-35 pb-16 md:pb-20 lg:pb-16">
        <PageHeader
          title="Privacy Policy"
          subtitle={`Last updated: ${lastUpdated}`}
        />

        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">Introduction</h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              SportOn (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is
              committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when
              you visit our website and purchase our sportswear products. Please
              read this privacy policy carefully. If you do not agree with the
              terms of this privacy policy, please do not access the site.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">
              Information We Collect
            </h2>
            <div className="text-sm md:text-base text-gray-600 leading-relaxed space-y-4">
              <p>
                <strong>Personal Information:</strong> We collect personal
                information that you voluntarily provide to us when you make a
                purchase, including your name, phone number, shipping address,
                and payment information.
              </p>
              <p>
                <strong>Order Information:</strong> When you place an order, we
                collect details about your purchase including products ordered,
                quantities, prices, and transaction details.
              </p>
              <p>
                <strong>Device Information:</strong> We automatically collect
                certain information about your device, including your IP
                address, web browser type, operating system, and browsing
                patterns.
              </p>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">
              How We Use Your Information
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc list-inside text-sm md:text-base text-gray-600 space-y-2 ml-4">
              <li>Processing and fulfilling your orders</li>
              <li>Communicating with you about your purchases</li>
              <li>Sending promotional materials (with your consent)</li>
              <li>Improving our website and products</li>
              <li>Preventing fraud and ensuring security</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          {/* Payment Information */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">
              Payment Information
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We require payment information to process your orders. Payment
              proof is collected via bank transfer. We store payment proof
              images securely and use them solely for order verification
              purposes. Your financial information is handled with the highest
              level of security.
            </p>
          </section>

          {/* Data Security */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">Data Security</h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We implement appropriate technical and organizational security
              measures to protect your personal information. However, no method
              of transmission over the Internet or electronic storage is 100%
              secure. While we strive to use commercially acceptable means to
              protect your personal information, we cannot guarantee its
              absolute security.
            </p>
          </section>

          {/* Cookies */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">
              Cookies and Tracking
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We use cookies and similar tracking technologies to track activity
              on our website and hold certain information. Cookies are files
              with a small amount of data which may include an anonymous unique
              identifier. You can instruct your browser to refuse all cookies or
              to indicate when a cookie is being sent.
            </p>
          </section>

          {/* Third-Party Services */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">
              Third-Party Services
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We may employ third-party companies and individuals to facilitate
              our website, provide the website on our behalf, perform
              website-related services, or assist us in analyzing how our
              website is used. These third parties have access to your personal
              information only to perform these tasks on our behalf and are
              obligated not to disclose or use it for any other purpose.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">Your Rights</h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding
              your personal information:
            </p>
            <ul className="list-disc list-inside text-sm md:text-base text-gray-600 space-y-2 ml-4">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to request deletion of your information</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">
              Children&apos;s Privacy
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Our website is not intended for children under the age of 18. We
              do not knowingly collect personal information from children under
              18. If you are a parent or guardian and you are aware that your
              child has provided us with personal information, please contact us
              so that we can take necessary actions.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the &quot;Last updated&quot; date. You are advised to
              review this Privacy Policy periodically for any changes.
            </p>
          </section>

          {/* Contact Us */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">Contact Us</h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy, please
              contact us:
            </p>
            <div className="bg-gray-100 rounded-xl p-6">
              <p className="text-sm md:text-base text-gray-600">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:privacy@sporton.com"
                  className="text-primary hover:underline"
                >
                  privacy@sporton.com
                </a>
              </p>
              <p className="text-sm md:text-base text-gray-600 mt-2">
                <strong>Phone:</strong>{" "}
                <a href="tel:+xxx" className="text-primary hover:underline">
                  +62 8123 4567 8901
                </a>
              </p>
              <p className="text-sm md:text-base text-gray-600 mt-2">
                <strong>Address:</strong> Jakarta, Indonesia
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicyPage;
