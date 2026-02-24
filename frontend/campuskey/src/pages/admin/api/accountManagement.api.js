import API from '@/api/api'

/**
 * Verify landlord account
 */
export const verifyLandlordAccount = async (username, idNumber, address) => {
  await API.put(`admin/verified/${username}`, null, {
    params: { idNumber, address },
  });
};

/**
 * Suspend landlord account
 */
export const suspendLandlordAccount = async (username) => {
  await API.put(`admin/suspend/${username}`);
};

/**
 * Unsuspend (unverify) landlord account
 */
export const unsuspendLandlordAccount = async (username) => {
  await API.put(`admin/unverified/${username}`);
};
