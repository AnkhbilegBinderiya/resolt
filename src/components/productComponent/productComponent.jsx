import { useState } from 'react';
import { GoCheck } from "react-icons/go";
import { GoX } from "react-icons/go";

const PricingCard = ({ plan, price, features }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCard = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      onClick={toggleCard}
      className={`cursor-pointer border rounded-2xl shadow-md p-4 duration-300  transition-all ${
        isExpanded ? 'h-auto' : 'h-24'
      }`}
    >
      {/* Top section - always visible */}
      <div className="flex justify-between">
        <h3 className="text-sm font-semibold">{plan}</h3>
        <h4 className="text-sm">{price}</h4>
      </div>

      {/* Expanded section - visible only when isExpanded is true */}
      {isExpanded && (
        <div className="mt-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              {feature.icon}
              <p>{feature.text}</p>
            </div>
          ))}
          <button className="mt-4 px-4 py-2 bg-black text-white rounded-lg">Choose</button>
        </div>
      )}
    </div>
  );
};

export default function Pricing() {
  const plans = [
    {
      plan: 'Free',
      price: '$0/mo',
      features: [
        { icon: <GoCheck className="text-primary" />, text: 'Main Predictions' },
        { icon: <GoCheck className="text-primary" />, text: 'Customer Support' },
        { icon: <GoCheck className="text-primary" />, text: 'Telegram Notification' },
        // ...other features
      ],
    },
    {
      plan: 'Standard',
      price: '$10/mo',
      features: [
        { icon: <GoCheck className="text-yellow-500" />, text: 'Main Predictions' },
        { icon: <GoCheck className="text-yellow-500" />, text: 'Static Predictions' },
        { icon: <GoCheck className="text-yellow-500" />, text: 'Weekly Special Predictions' },
        // ...other features
      ],
    },
    {
      plan: 'Pro',
      price: '$30/mo',
      features: [
        { icon: <GoCheck className="text-primary" />, text: 'Main Predictions' },
        { icon: <GoCheck className="text-primary" />, text: 'VIP Response' },
        { icon: <GoCheck className="text-primary" />, text: 'Balance Management' },
        // ...other features
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto w-full">
      {plans.map((plan, index) => (
        <PricingCard
          key={index}
          plan={plan.plan}
          price={plan.price}
          features={plan.features}
        />
      ))}
    </div>
  );
}