import React, { useState } from 'react';

const faqs = [
  {
    question: 'What documents are required to rent a car?',
    answer:
      'You will need a valid driving license, government-issued ID (such as Aadhaar or PAN card), and a valid credit/debit card for payment and security.',
  },
  {
    question: 'What is the minimum age to rent a car?',
    answer:
      'The minimum age requirement is 21 years. However, some vehicles may require you to be at least 25 years old.',
  },
  {
    question: 'Can I rent a car without a credit card?',
    answer:
      'Yes, you can rent using a debit card, but a refundable security deposit will be required.',
  },
  {
    question: 'What happens if I return the car late?',
    answer:
      'Late returns are subject to additional hourly or daily charges depending on how late the car is returned.',
  },
  {
    question: 'Is there a limit on how far I can drive the car?',
    answer:
      'Most rentals come with unlimited mileage. However, for certain vehicles, distance limits may apply. Please check the terms during booking.',
  },
  {
    question: 'Can I cancel or modify my booking?',
    answer:
      'Yes, you can cancel or modify your booking from your user dashboard. Cancellation charges may apply based on the policy.',
  },
  {
    question: 'What should I do in case of an accident or breakdown?',
    answer:
      'Immediately contact our 24/7 support number and follow the emergency instructions provided. We offer roadside assistance in most locations.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-yellow-600">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm"
          >
            <button
              className="w-full flex justify-between items-center px-4 py-3 text-left text-gray-800 font-medium focus:outline-none"
              onClick={() => toggleIndex(index)}
            >
              <span>{faq.question}</span>
              <span className="text-yellow-600">{openIndex === index ? '-' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
