import API from '@/api/api'

export const fetchDashboardStats = async () => {
    const response = await API.get("/admin/dashboard");
    return response.data;
};
export const fetchProperties = async () => {
    const response = await API.get("/admin/properties");
    return response.data;
}

export const fetchAllLandlords= async () => {
    const response = await API.get("/admin/landlords/verifications");
    return response.data;
}

export const fetchLandlordVerificationDocument = async (id) => {
    const response = await API.get(`/admin/landlords/verifications/${id}/document`, {
        responseType: "blob",
    });
    return response.data;
}

export const fetchPropertyVerificationDocument = async (propertyId) => {
    const response = await API.get(`/admin/properties/${propertyId}/verification-document`, {
        responseType: "blob",
    });
    return response.data;
}

// Submit verification document (optional)
export const submitVerificationDocument = async (propertyId, file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await API.post(`/${propertyId}/submit`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

// Approve property
export const approveProperty = async (propertyId) => {
    const response = await API.put(`/${propertyId}/approve`);
    return response.data;
};

// Reject property
export const rejectProperty = async (propertyId, notes) => {
    const response = await API.post(`/${propertyId}/reject`, { notes });
    return response.data;
};
