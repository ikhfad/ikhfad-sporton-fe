import PageHeader from "../components/ui/page-header";

const TermsConditionsPage = () => {
  const lastUpdated = "February 16, 2026";

  return (
    <main>
      <div className="container min-h-screen mx-auto sm:px-6 pt-30 xl:pt-35 pb-16 md:pb-20 lg:pb-16">
        <PageHeader
          title="Terms & Conditions"
          subtitle={`Last updated: ${lastUpdated}`}
        />

        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Welcome to SportOn. By accessing and using our website to purchase
              sportswear products, you accept and agree to be bound by the terms
              and provisions of this agreement. If you do not agree to abide by
              these terms, please do not use this website. These Terms and
              Conditions apply to all visitors, users, and others who access or
              use the Service.
            </p>
          </section>

          {/* Products and Purchases */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">
              Products and Purchases
            </h2>
            <div className="text-sm md:text-base text-gray-600 leading-relaxed space-y-4">
              <p>
                <strong>Product Information:</strong> We make every effort to
                display our sportswear products as accurately as possible.
                However, we cannot guarantee that your computer monitor display
                of any color will be accurate. Product descriptions, pricing,
                and availability are subject to change without notice.
              </p>
              <p>
                <strong>Order Acceptance:</strong> We reserve the right to
                refuse any order for any reason. When you place an order, you
                are making an offer to purchase products. We may require
                additional verification or information before accepting an
                order.
              </p>
              <p>
                <strong>Stock Availability:</strong> All products are subject to
                availability. We may indicate that a product is available when
                it is actually out of stock. In such cases, we will contact you
                to discuss alternatives or process a refund.
              </p>
            </div>
          </section>

          {/* Payment and Pricing */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">
              Payment and Pricing
            </h2>
            <div className="text-sm md:text-base text-gray-600 leading-relaxed space-y-4">
              <p>
                <strong>Payment Method:</strong> We accept payment via bank
                transfer. After placing your order, you will need to upload
                proof of payment for verification before your order is
                processed.
              </p>
              <p>
                <strong>Pricing:</strong> All prices displayed on our website
                are in Indonesian Rupiah (IDR) and are inclusive of applicable
                taxes unless otherwise stated. We reserve the right to modify
                prices at any time without prior notice.
              </p>
              <p>
                <strong>Payment Verification:</strong> Orders will only be
                processed after payment has been verified. Please ensure your
                payment proof is clear and includes all necessary transaction
                details.
              </p>
            </div>
          </section>

          {/* Shipping and Delivery */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">
              Shipping and Delivery
            </h2>
            <div className="text-sm md:text-base text-gray-600 leading-relaxed space-y-4">
              <p>
                <strong>Shipping Areas:</strong> We currently ship to addresses
                within Indonesia. International shipping may be available for
                select locations - please contact us for more information.
              </p>
              <p>
                <strong>Delivery Time:</strong> Estimated delivery times are
                provided as guidelines only and may vary depending on your
                location and product availability. We are not responsible for
                delays caused by shipping carriers or circumstances beyond our
                control.
              </p>
              <p>
                <strong>Shipping Address:</strong> Please ensure your shipping
                address is accurate and complete. We are not responsible for
                orders delivered to incorrect addresses provided by customers.
              </p>
            </div>
          </section>

          {/* Returns and Refunds */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">
              Returns and Refunds
            </h2>
            <div className="text-sm md:text-base text-gray-600 leading-relaxed space-y-4">
              <p>
                <strong>Return Policy:</strong> We want you to be completely
                satisfied with your purchase. If you are not satisfied, you may
                return unworn, unwashed items with original tags within 7 days
                of delivery for a full refund or exchange.
              </p>
              <p>
                <strong>Return Process:</strong> To initiate a return, please
                contact our customer service team with your order number and
                reason for return. We will provide instructions for returning
                the item(s).
              </p>
              <p>
                <strong>Refund Processing:</strong> Refunds will be processed
                within 5-7 business days after we receive and inspect the
                returned item(s). Refunds will be issued to the original payment
                method.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">
              Intellectual Property
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              The Service and its original content, features, and functionality
              are and will remain the exclusive property of SportOn and its
              licensors. The Service is protected by copyright, trademark, and
              other laws of both Indonesia and foreign countries. Our trademarks
              and trade dress may not be used in connection with any product or
              service without the prior written consent of SportOn.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">
              Limitation of Liability
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              In no event shall SportOn, nor its directors, employees, partners,
              agents, suppliers, or affiliates, be liable for any indirect,
              incidental, special, consequential, or punitive damages, including
              without limitation, loss of profits, data, use, goodwill, or other
              intangible losses, resulting from your access to or use of or
              inability to access or use the Service.
            </p>
          </section>

          {/* Disclaimer */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">Disclaimer</h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Your use of the Service is at your sole risk. The Service is
              provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot;
              basis. The Service is provided without warranties of any kind,
              whether express or implied. We do not warrant that the Service
              will be uninterrupted, timely, secure, or error-free.
            </p>
          </section>

          {/* Governing Law */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">Governing Law</h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              These Terms shall be governed and construed in accordance with the
              laws of Indonesia, without regard to its conflict of law
              provisions. Our failure to enforce any right or provision of these
              Terms will not be considered a waiver of those rights.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">
              Changes to Terms
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material, we will try to
              provide at least 30 days notice prior to any new terms taking
              effect. What constitutes a material change will be determined at
              our sole discretion.
            </p>
          </section>

          {/* Contact Us */}
          <section className="mb-10 md:mb-12">
            <h2 className="font-bold text-lg md:text-xl mb-4">Contact Us</h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              If you have any questions about these Terms and Conditions, please
              contact us:
            </p>
            <div className="bg-gray-100 rounded-xl p-6">
              <p className="text-sm md:text-base text-gray-600">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:legal@sporton.com"
                  className="text-primary hover:underline"
                >
                  legal@sporton.com
                </a>
              </p>
              <p className="text-sm md:text-base text-gray-600 mt-2">
                <strong>Phone:</strong>{" "}
                <a
                  href="tel:+6281234567890"
                  className="text-primary hover:underline"
                >
                  +62 812 3456 7890
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

export default TermsConditionsPage;
