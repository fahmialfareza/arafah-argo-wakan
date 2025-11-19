import { useMutation } from "@tanstack/react-query";

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
  products: string[];
}

interface SubmitInquiryResponse {
  success: boolean;
  message: string;
  data?: {
    reference_id: string;
    submitted_at: string;
  };
  errors?: Record<string, string[]>;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const useSubmitContactForm = () => {
  return useMutation<SubmitInquiryResponse, Error, ContactFormData>({
    mutationFn: async (formData: ContactFormData) => {
      const response = await fetch(`${API_BASE_URL}/contact/submit-inquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit inquiry");
      }

      return data;
    },
  });
};
