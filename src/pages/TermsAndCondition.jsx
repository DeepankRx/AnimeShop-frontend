import React from 'react';
import Helmet from '../util/Helmet';
const TermsAndCondition = () => {

  const termsAndConditions = [
    {
      title: '1. General Terms',
      points: [
        'a. animart.in is a registered website under the Udyam registration.',
        'b. The terms "we," "us," and "our" refer to animart.in, and the terms "you" and "your" refer to the users and customers of our website.',
        'c. By using our website and placing orders, you acknowledge that you are at least 18 years old or accessing the website under the supervision of a legal guardian.',
        'd. We reserve the right to modify or update these terms and conditions at any time without prior notice. By continuing to use the website after any modifications, you accept the updated terms and conditions.'
      ]
    },
    {
      title: '2. Product Information',
      points: [
        'a. We strive to provide accurate and detailed information about our anime merchandise, including product descriptions, pricing, specifications, and availability.',
        'b. Prices listed on animart.in are in the local currency and are subject to applicable taxes and shipping fees.',
        'c. We reserve the right to limit quantities of any product and to discontinue or modify products at any time without prior notice.'
      ]
    },
    {
      title: '3. Ordering and Payment',
      points: [
        'a. To place an order, you must follow the ordering process on our website. By placing an order, you make an offer to purchase the products selected.',
        'b. We accept various payment methods as specified during the checkout process.',
        'c. By providing payment information, you warrant that you are authorized to use the payment method and authorize us to charge the total amount for your order.',
        'd. We reserve the right to refuse or cancel any order, partially or entirely, for reasons including but not limited to stock availability, payment issues, or suspected fraudulent activity.'
      ]
    },
    {
      title: '4. Shipping and Delivery',
      points: [
        'a. We offer shipping services to the specified locations mentioned during the checkout process. Shipping fees and estimated delivery timescales are provided for your reference. It can take 3-15 Business Days to deliver.',
        'b. We aim to fulfill orders promptly; however, delivery times may vary depending on factors beyond our control, such as customs clearance or unforeseen circumstances.',
        'c. Customers are responsible for any customs duties, import taxes, or additional fees imposed by the destination country.',
        'd. In case of lost or damaged shipments, please contact our customer support for assistance.'
      ]
    },
    {
      title: '5. Returns and Refunds',
      points: [
        'a. We want you to be satisfied with your purchase. If you are not completely happy with your order, you may request a return or exchange within a specified time frame, subject to our return policy.',
        'b. Returned merchandise must meet certain conditions, such as being in its original packaging and in unused condition. Personalized or limited-edition items may not be eligible for return or exchange.',
        'c. Refunds will be issued in the form of store credit or the original payment method, depending on the circumstances.'
      ]
    },
    {
      title: '6. Intellectual Property',
      points: [
        'a. All trademarks, logos, and copyrights displayed on animart.in are the property of their respective owners.',
        'b. Users are prohibited from unauthorized use, reproduction, or distribution of any copyrighted material found on our website.'
      ]
    },
    {
      title: '7. Privacy and Data Protection',
      points: [
        'a. We respect your privacy and handle your personal information in accordance with our Privacy Policy. By using animart.in, you consent to the collection, use, and disclosure of your personal information as outlined in the Privacy Policy.'
      ]
    },
    {
      title: '8. Liability and Disclaimers',
      points: [
        'a. We strive to provide accurate and reliable information on our website. However, we do not guarantee the completeness, accuracy, or reliability of any content or information.',
        'b. By using animart.in, you acknowledge and agree that your use of the website is at your own risk. We are not responsible for any damages or losses arising from your use or inability to use the website or any products purchased.'
      ]
    },
    {
      title: '9. Governing Law and Jurisdiction',
      points: [
        'a. These terms and conditions shall be governed by and interpreted in accordance with the laws of [Jurisdiction]. Any disputes arising from or relating to these terms and conditions shall be subject to the exclusive jurisdiction of the courts in [Jurisdiction].'
      ]
    },
    {
      title: '10. Contact Information',
      points: [
        'For any inquiries, complaints, or support, please contact us using the following information:',
        'Website: animart.in',
        'Email: admin@animart.in',
        'Phone: +91 79835 91349',
        'Address: 19/36 A, Gandhi Nagar, Aligarh, Uttar Pradesh, India - 202001'
      ]
    }
  ];
  return (
    <div className="container mx-auto px-4 py-8">
        <Helmet title="Terms and Conditions | Animart" />
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

      <p className="mb-6">
        Welcome to animart.in! These terms and conditions govern your use of our website and the purchase of anime merchandise from our ecommerce store. By
        accessing and using animart.in, you agree to comply with these terms and conditions. Please read them carefully.
      </p>
      {termsAndConditions.map((term, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-2xl font-bold mb-4">{term.title}</h2>
          <ul className="list-disc list-inside">
            {term.points.map((point, index) => (
              <li key={index} className="mb-2">
                {point}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TermsAndCondition;
