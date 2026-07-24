import api from "../api/axios";

// home best experience banner
export const getBestExperienceBanner = async () => {
  const response = await api.get(`best-experience/get-all`);
  return response?.data;
};

// testimonial
export const getTestimonial = async () => {
  const response = await api.get(`testimonial/get-all`);
  return response?.data;
};

// --- EXISTING METHODS ---
export async function fetchBanners() {
  const response = await api.get("/homebanner/get-all", {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

export async function uploadForm(payload) {
  const response = await api.post("/form/create", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}

// --- CONTACT METHODS ---
export const getAllContactApi = async () => {
  const res = await api.get("/contact/get-all");
  return res.data;
};

// --- FOOTER & LEGAL METHODS ---
export const getFooterApi = async () => {
  const res = await api.get("/footer-text/get-all");
  return res.data;
};

export const getTermsApi = async () => {
  const res = await api.get("/term-condition/get-all");
  return res.data;
};

export const getPrivacyPolicyApi = async () => {
  const res = await api.get("/privacy-policy/get-all");
  return res.data;
};

// -- AREA WE COVER---
export const getAreaWeCoverBannerApi = async () => {
  const res = await api.get("/area-banner/get-all");
  return res.data;
};
export const getAreaWeCoverContentApi = async () => {
  const res = await api.get("/area-content/get-all");
  return res.data;
};
export const getAreaWeCoverMap = async () => {
  const res = await api.get("/area-map/get-all")
  return res.data;
}

// --- OUR SERVICES METHODS ---
export const getPropertyManagementBannerApi = async () => {
  const res = await api.get("/property-management-banner/get-all");
  return res.data;
};

export const getPropertyManagementContentApi = async () => {
  const res = await api.get("/property-management-content/get-all");
  return res.data;
};

export const getPropertyManagementServicesApi = async () => {
  const res = await api.get("/property-management-services/get-all");
  return res.data;
};

// --- SOCIAL MEDIA METHODS ---
export const getSocialMediaApi = async () => {
  const res = await api.get("/social-media/get-all");
  return res.data;
};

// --- INQUIRY METHODS (All Dynamic with Console Logs) ---

// Send Inquiry (POST)
export const sendInquiryApi = async (payload) => {
  console.log("API CALL: Sending Inquiry...", payload);
  const response = await api.post("/inquiry/send", payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// about Us
export const aboutUs = async () => {
  const response = await api.get(`/aboutus/get-all`);
  return response.data;
};

// Get All Inquiries (GET)
export const getAllInquiryApi = async () => {
  const response = await api.get("/inquiry/get-all");
  return response.data;
};

// Get Inquiry By ID (GET)
export const getInquiryByIdApi = async (id) => {
  const response = await api.get(`/inquiry/get-by-id/${id}`);
  return response.data;
};

// Update Inquiry (PUT)
export const updateInquiryApi = async (id, payload) => {
  const response = await api.put(`/inquiry/update/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// Delete Inquiry (DELETE)
export const deleteInquiryApi = async (id) => {
  const response = await api.delete(`/inquiry/delete/${id}`);
  return response.data;
};

// appraisal Form.
export const appraisalForm = async (payload) => {
  const response = await api.post(`/appraisal/create`, payload);
  return response?.data;
};

// area we cover
export const getAreaWeCoverBanner = async () => {
  const response = await api.get(`/area-banner/get-all`);
  return response?.data;
};

// area we cover content
export const getAreaWeCoverContent = async () => {
  const response = await api.get(`/area-content/get-all`);
  return response?.data;
};

// /pricing-banner/

export const getPricingBanner = async () => {
  const response = await api.get(`/pricing-banner/get-all`);
  return response?.data;
};
export const getPricingFormContent = async () => {
  const response = await api.get(`/pricing-form-content/get-all`);
  return response?.data;
};

// 	/pricing-form
export const pricingForm = async (payload) => {
  const response = await api.post(`pricing-form/send`, payload);
  return response?.data;
};

// Pricing content
export const getPricingContent = async () => {
  const response = await api.get(`/pricing-content/get-all`);
  return response?.data;
};

// /FAQ-banner/
export const getFaqBanner = async () => {
  const response = await api.get(`/faq-banner/get-all`);
  return response?.data;
};

// faq ask questoins
export const getFaqQuestions = async () => {
  const response = await api.get(`/faq-content/get-all`);
  return response?.data;
};

// available for rent
export async function availableForRent() {
  const response = await api.get("properties/available-rent");
  return response.data;
}

// rented
export async function getRentedProperties() {
  const response = await api.get(
    "properties/leased?status=management&leasedType=leased",
  );
  return response.data;
}

// our expertise
export const getOurExpertiseApi = async () => {
  const response = await api.get("/our-expertise/get-all");
  return response.data;
};

// logo
export const getLogoApi = async () => {
  const response = await api.get("/logo/get-all");
  return response.data;
};

// maintenance endpoints for specific page sections
export const getMaintenanceBannerApi = async () => {
  const response = await api.get("/maintenance-banner/get-all");
  return response.data;
};

export const getMaintenanceFirstSectionApi = async () => {
  const response = await api.get("/maintenance-first-section/get-all");
  return response.data;
};

export const getMaintenanceSecondSectionApi = async () => {
  const response = await api.get("/maintenance-second-section/get-all");
  return response.data;
};

export const getMaintenanceThirdSectionApi = async () => {
  const response = await api.get("/maintenance-third-section/get-all");
  return response.data;
};
