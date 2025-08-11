import React, { useState } from 'react';

type Field = {
  name: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[]; // for dropdown
};

type EmailGateProps = {
  fields: Field[];
  privacyText: string;
  submitText: string;
  onSubmitted: () => void;
};

const EmailGate: React.FC<EmailGateProps> = ({ fields, privacyText, submitText, onSubmitted }) => {
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    fields.forEach(({ name, label, required, type }) => {
      const value = formValues[name];
      if (required) {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          newErrors[name] = `${label} is required`;
        } else if (type === 'email' && !/\S+@\S+\.\S+/.test(value)) {
          newErrors[name] = `Please enter a valid email address`;
        } else if (type === 'tel' && value && !/^\+?[0-9\s\-()]{7,}$/.test(value)) {
          newErrors[name] = `Please enter a valid phone number`;
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSubmitError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError('');

    try {
      // TODO: Replace with your API call to n8n or backend to send email
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      onSubmitted();
    } catch (err) {
      setSubmitError('Submission failed. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Email capture form">
      {fields.map(({ name, label, type, required, options }) => {
        if (type === 'dropdown' && options) {
          return (
            <label key={name}>
              {label}{required && '*'}
              <select
                name={name}
                value={formValues[name] || ''}
                onChange={(e) => handleChange(name, e.target.value)}
                required={required}
                aria-required={required}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors[name] && <div className="error">{errors[name]}</div>}
            </label>
          );
        }

        if (type === 'checkbox') {
          return (
            <label key={name}>
              <input
                type="checkbox"
                name={name}
                checked={!!formValues[name]}
                onChange={(e) => handleChange(name, e.target.checked)}
                required={required}
                aria-required={required}
              />
              {label}{required && '*'}
              {errors[name] && <div className="error">{errors[name]}</div>}
            </label>
          );
        }

        return (
          <label key={name}>
            {label}{required && '*'}
            <input
              type={type}
              name={name}
              value={formValues[name] || ''}
              onChange={(e) => handleChange(name, e.target.value)}
              required={required}
              aria-required={required}
            />
            {errors[name] && <div className="error">{errors[name]}</div>}
          </label>
        );
      })}
      <p className="privacy-text">{privacyText}</p>
      {submitError && <div className="submit-error">{submitError}</div>}
      <button type="submit" disabled={submitting} aria-busy={submitting}>
        {submitText}
      </button>
      <style jsx>{`
        form {
          max-width: 600px;
          margin: 2rem auto;
          font-family: 'Rajdhani', sans-serif;
          color: var(--slate);
        }
        label {
          display: block;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        input,
        select {
          width: 100%;
          padding: 0.5rem;
          margin-top: 0.25rem;
          font-size: 1rem;
          border: 1px solid var(--muted-slate, #ccc);
          border-radius: 4px;
          font-family: inherit;
          box-sizing: border-box;
        }
        .error {
          color: #e53e3e;
          font-size: 0.875rem;
          margin-top: 0.25rem;
        }
        .submit-error {
          color: #e53e3e;
          margin-bottom: 1rem;
        }
        .privacy-text {
          font-size: 0.875rem;
          color: var(--muted-slate, #666);
          margin-bottom: 1rem;
        }
        button {
          background-color: var(--teal);
          color: white;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.125rem;
          cursor: pointer;
          border-radius: 6px;
          transition: background-color 0.3s ease;
        }
        button:hover,
        button:focus {
          background-color: #107a70;
          outline: none;
        }
      `}</style>
    </form>
  );
};

export default EmailGate;
