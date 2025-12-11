import React, { useState } from 'react';

const Contact = () => {
  // State to capture form input
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });
  const [succesText, setSuccesText] = useState('');

  // Handle change in form inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Send form data to backend API
    try {
      const response = await fetch('https://laasara-backend-8a70df67d523.herokuapp.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccesText('Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.');
        setFormData({
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setSuccesText('Er is een fout opgetreden bij het verzenden van uw bericht. Probeer opnieuw.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSuccesText('Er is een fout opgetreden. Zorg ervoor dat u verbonden bent met het internet.');
    }
  };

  return (
    <div>
      <section className="bg-white py-24 dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md relative">
          <h2 className=" mb-4 text-4xl tracking-tight font-bold text-center text-gray-700 dark:text-white">Contacteer Ons</h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Heb je vragen? Wil je graag feedback sture? Interesse in een samenwerking? Laat ons weten.
          </p>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Onderwerp</label>
              <input
                type="text"
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Let us know how we can help you"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Jou vraag</label>
              <textarea
                id="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-softBlue sm:w-fit hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Verstuur
            </button>
            <label htmlFor="alert" className='text-xs ml-10'>{succesText}</label>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
