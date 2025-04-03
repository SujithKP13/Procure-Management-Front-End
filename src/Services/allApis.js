import { commonApi } from "./commonApi"
import { serverUrl } from "./serverApi"

// API call for create users
export const createUser = async (reqBody) => {
    return await commonApi('POST',`${serverUrl}/users`,reqBody);
}

// Get all users
export const getUsers = async () => {
    return await commonApi('GET',`${serverUrl}/users`,"");
}

// Create Vendor Details
export const createVendor = async (vendors) => {
    return await commonApi('POST',`${serverUrl}/vendors`,vendors);
}

// Get All Vendors
export const getVendors = async () => {
    return await commonApi('GET',`${serverUrl}/vendors`,"");
}

// Delete Vendor
export const deleteVendor = async (id) => {
    return await commonApi('DELETE', `${serverUrl}/vendors/${id}`,{});
}

// Update Vendor
export const updateVendor = async (id, vendors) => {
    return await commonApi('PUT', `${serverUrl}/vendors/${id}`, vendors);
}

// Create Order
export const createOrder = async (order) => {
    return await commonApi('POST',`${serverUrl}/orders`,order);
}

// Get All Orders
export const getAllOrders = async () => {
    return await commonApi('GET',`${serverUrl}/orders`,"");
}

// Delete Order
export const deleteOrder = async (id) => {
    return await commonApi('DELETE', `${serverUrl}/orders/${id}`, {});
}

// create Process Purchase
export const createProcessPurchase = async (processPurchase) => {
    return await commonApi('POST', `${serverUrl}/purchaseProcess`, processPurchase);
}

// Get All Process Purchase
export const getAllProcessPurchase = async () => {
    return await commonApi('GET', `${serverUrl}/purchaseProcess`,"");
}