import React from 'react';
import Helmet from '../util/Helmet';
const PrivacyPolicy = () => {

    const privacyPolicy = [
    {
      title: '1. Information We Collect',
      points: [
        'a. Personal Information: When you create an account, place an order, or interact with our website, we may collect personal information, such as your name, email address, shipping address, and payment details.',
        'b. Usage Information: We may collect non-personal information about your interaction with our website, including your IP address, browser type, operating system, and pages visited.',
        'c. Cookies: We use cookies and similar technologies to enhance your browsing experience, analyze usage patterns, and personalize content. You can manage your cookie preferences through your browser settings.'
      ]
    },
    {
      title: '2. Use of Information',
      points: [
        'a. Personalization: We may use your personal information to personalize your experience, such as displaying relevant products, recommendations, or promotions.',
        'b. Order Processing: We use your personal information to process and fulfill your orders, communicate order updates, and provide customer support.',
        'c. Communication: We may use your contact information to send you promotional emails, newsletters, or other marketing communications. You can opt-out of these communications at any time.',
        "d. Analytics: We may analyze usage patterns and website performance using aggregated and anonymized data to improve our website's functionality and user experience.",
        'e. Legal Compliance: We may process your personal information to comply with legal obligations, enforce our terms and conditions, or respond to lawful requests from authorities.'
      ]
    },
    {
      title: '3. Data Sharing and Protection',
      points: [
        'a. Third-Party Service Providers: We may share your personal information with trusted third-party service providers who assist us in operating our website, conducting business, and providing services to you. These service providers have access to your information only to perform specific tasks on our behalf and are obligated to protect your information.',
        'b. Business Transfers: In the event of a merger, acquisition, or sale of our business assets, your personal information may be transferred or disclosed as part of the transaction. We will notify you of any such change and ensure the confidentiality of your information.',
        'c. Data Security: We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, or alteration. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.'
      ]
    },
    {
      title: '4. Your Rights and Choices',
      points: [
        'a. Account Information: You can review and update your account information by logging into your account on animart.in.',
        'b. Marketing Communications: You can opt-out of receiving marketing communications from us by following the unsubscribe instructions provided in the communication or contacting us directly.',
        'c. Cookies: You can manage your cookie preferences through your browser settings or use the cookie management tools provided on animart.in. However, disabling cookies may affect your browsing experience.',
        'd. Access, Rectification, and Erasure: You have the right to access, rectify, or request the erasure of your personal information held by us. Please contact us using the information provided below to exercise these rights.'
      ]
    },
    {
      title: '5. Changes to the Privacy Policy',
      points: [
        'We may update or revise this Privacy Policy from time to time. Any changes will be effective immediately upon posting the revised Privacy Policy on animart.in. We encourage you to review this Privacy Policy periodically for any updates.'
      ]
    },
    {
      title: '6. Contact Us',
      points: [
        'If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us using the following information:',
        'Website: animart.in',
        'Email: admin@animart.in',
        'Phone: +91 79835 91349',
        'Address: 19/36 A, Gandhi Nagar, Aligarh, Uttar Pradesh, India - 202001'
      ]
    }
  ];
  return (
    <div className="container mx-auto px-4 py-8">
        <Helmet title="Privacy Policy | Animart" />
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-6">
        At animart.in, we value and respect your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you use
        our website. By accessing and using animart.in, you consent to the practices outlined in this Privacy Policy.
      </p>
      {privacyPolicy.map((term, index) => (
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

export default PrivacyPolicy;
