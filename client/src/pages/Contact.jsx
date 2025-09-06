import React, { useState } from 'react';
import { Mail, User, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert('Message sent successfully!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-3xl grid md:grid-cols-2">
        {/* Left Side */}
        <div className="bg-yellow-500 text-white p-8 rounded-l-xl flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg mb-6">
            We'd love to hear from you. Whether you have a question or just want to say hi — our inbox is always open.
          </p>
          <div className="mt-auto">
            <p className="text-sm">Email us at</p>
            <p className="text-lg font-semibold">support@carrental.com</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div className="relative">
            <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
              required
            />
          </div>

          <div className="relative">
            <MessageSquare className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-600 transition font-semibold"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
