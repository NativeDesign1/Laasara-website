import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  // State to capture form input
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: '',
  });
  const [succesText, setSuccesText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('rCGRv_Y1wmROpV7zb'); // Public Key van EmailJS
  }, []);

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
    
    // Prevent multiple submissions
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      await emailjs.send(
        'service_idrr9ks', // Service ID
        'contact-la', // Template ID
        {
          from_email: formData.email,
          from_name: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'info@laassarafoundation.nl',
        }
      );

      setSuccesText('Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.');
      setFormData({
        email: '',
        subject: '',
        message: '',
      });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccesText(''), 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setSuccesText('Er is een fout opgetreden bij het verzenden van uw bericht. Probeer opnieuw.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-cyan-600 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6">Contact opnemen</h1>
          <p className="text-xl max-w-3xl mx-auto text-emerald-50">
            Heb je vragen of wil je meer informatie? Neem gerust contact met ons op!
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Contactgegevens</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-500 text-white">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                      <p className="text-gray-600">info@laassaarafoundation.nl</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-cyan-500 text-white">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Telefoon</h3>
                      <p className="text-gray-600">+31 623044495</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-emerald-500 text-white">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Adres</h3>
                      <p className="text-gray-600">Keulseplein 11<br />6043EX Roermond, NL</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-2xl shadow-sm">
                <div>
                  <label htmlFor="email" className="block mb-3 text-sm font-semibold text-gray-800">
                    Je e-mailadres
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    placeholder="jouw@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block mb-3 text-sm font-semibold text-gray-800">
                    Onderwerp
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    placeholder="Waar gaat je bericht over?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-3 text-sm font-semibold text-gray-800">
                    Je bericht
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition resize-none"
                    placeholder="Vertel ons wat je wilt..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold py-3 rounded-lg transition duration-300 transform ${
                    isLoading 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {isLoading ? 'Bezig met verzenden...' : 'Verstuur bericht'}
                </button>

                {succesText && (
                  <div className={`p-4 rounded-lg text-center font-medium ${
                    succesText.includes('Bedankt') 
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' 
                      : 'bg-red-100 text-red-700 border border-red-300'
                  }`}>
                    {succesText}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
