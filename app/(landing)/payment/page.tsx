import PaymentOptions from "../components/payment/payment-options";
import PaymentSteps from "../components/payment/payment-steps";

const Payment = () => {
  return (
    <main className="bg-gray-100 min-h-screen pt-16 md:pt-20">
      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-16 lg:py-20">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-8 md:mb-11">
          Payment
        </h1>

        {/* Grid: Stacked on mobile, side-by-side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 lg:gap-14">
          <PaymentOptions />
          <PaymentSteps />
        </div>
      </div>
    </main>
  );
};

export default Payment;
