import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/contect.css';
import { useTranslation } from '../components/TranslationContext';

interface ContactProps {
  contactInfo?: {
    email?: string;
    phone?: string;
    linkedin?: string;
    github?: string;
    telegram?: string;
  };
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}


export const Contact: React.FC<ContactProps> = ({ 
  contactInfo = {
    email: 'ramynady1978@gmail.com',
    phone: '+7 (982) 728 86-14',
    linkedin: 'https://www.linkedin.com/in/ramy-nady-1a766625a/',
    github: 'https://github.com/ramynady78/',
    telegram: 'https://t.me/ramynady8'
  }
}) => {
  const form = useRef<HTMLFormElement>(null);

  const {t} = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);



  // Initialize EmailJS (replace with your actual service ID, template ID, and public key)
  const SERVICE_ID = 'service_dl5jfpe';
  const TEMPLATE_ID = 'template_lzdzjbb';
  const PUBLIC_KEY = 'hWUsUyzyYs-AE_u_T';

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = t.nameError;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.emailError;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.emailError;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t.subjectError;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.messageError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // EmailJS send
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        form.current!,
        PUBLIC_KEY
      );

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`contact-container contact-page`}>
       <section className="about-hero">
          <h1 className="typing-title">{t.contact_me}</h1>
          <div className="typing-container">
            <span className="typed-text">{t.question_or_work_together}</span>
          </div>
        </section>
      <div className="contact-wrapper">
        
        {/* Form Section */}
        <div className="contact-form-section">
          <div className="section-header">
            <h1 className="section-title-contact">{t.sendAMessage}</h1>
          </div>

          <form ref={form} onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                {t.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t.namePlaceholder}
                className={`form-input ${errors.name ? 'error' : ''}`}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                {t.email}
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t.emailPlaceholder}
                className={`form-input ${errors.email ? 'error' : ''}`}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                {t.subject}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder={t.subjectPlaceholder}
                className={`form-input ${errors.subject ? 'error' : ''}`}
              />
              {errors.subject && <span className="error-message">{errors.subject}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                {t.message}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={t.messagePlaceholder}
                rows={5}
                className={`form-textarea ${errors.message ? 'error' : ''}`}
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? t.sending : t.send}
            </button>

            {submitStatus === 'success' && (
              <div className="status-message success">
                {t.success}
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="status-message error">
                {t.error}
              </div>
            )}
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="contact-info-section">
          <div className="section-header">
            <h2 className="section-title-contact">{t.getInTouch}</h2>
          </div>

          <div className="contact-info-list">
            {contactInfo.email && (
              <div className="contact-info-item" onClick={() => window.location.href = `mailto:${contactInfo.email}`}>
                <div className="contact-info-icon email">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="contact-info-content">
                  <h3 className="contact-info-label">{t.emailLabel}</h3>
                  <p className="contact-info-value">{contactInfo.email}</p>
                </div>
              </div>
            )}

            {contactInfo.phone && (
              <div className="contact-info-item" onClick={() => window.location.href = `tel:${contactInfo.phone}`}>
                <div className="contact-info-icon phone">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className="contact-info-content">
                  <h3 className="contact-info-label">{t.phoneLabel}</h3>
                  <p className="contact-info-value">{contactInfo.phone}</p>
                </div>
              </div>
            )}

            {contactInfo.linkedin && (
              <div className="contact-info-item" onClick={() => openLink(contactInfo.linkedin!)}>
                <div className="contact-info-icon linkedin">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </div>
                <div className="contact-info-content">
                  <h3 className="contact-info-label">{t.linkedinLabel}</h3>
                  <p className="contact-info-value">linkedin.com/in/ramy-nady-1a766625a</p>
                </div>
              </div>
            )}

            {contactInfo.github && (
              <div className="contact-info-item" onClick={() => openLink(contactInfo.github!)}>
                <div className="contact-info-icon github">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                  </svg>
                </div>
                <div className="contact-info-content">
                  <h3 className="contact-info-label">{t.githubLabel}</h3>
                  <p className="contact-info-value">github.com/ramynady78</p>
                </div>
              </div>
            )}

            {contactInfo.telegram && (
              <div className="contact-info-item" onClick={() => openLink(contactInfo.telegram!)}>
                <div className="contact-info-icon telegram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z"/>
                    <path d="M11.38 13.52L21 3"/>
                  </svg>
                </div>
                <div className="contact-info-content">
                  <h3 className="contact-info-label">{t.telegramLabel}</h3>
                  <p className="contact-info-value">https://t.me/ramynady8</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

