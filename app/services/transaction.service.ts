import { fetchAPI, getAuthHeaders } from "../lib/api";
import { Transaction } from "../types";

export const transactionCheckout = async (
  form: FormData,
): Promise<Transaction> => {
  return await fetchAPI<Transaction>("/transactions/checkout", {
    method: "POST",
    body: form,
  });
};

export const getTransactionById = async (id: string): Promise<Transaction> => {
  return await fetchAPI<Transaction>(`/transactions/${id}`);
};

export const getAllTransaction = async (): Promise<Transaction[]> => {
  return await fetchAPI<Transaction[]>("/transactions", {
    headers: {
      ...getAuthHeaders(),
    },
  });
};

export const updateTransaction = async (
  id: string,
  data: { status: string },
): Promise<Transaction> => {
  return await fetchAPI<Transaction>(`/transactions/${id}`, {
    method: "PATCH",
    headers: {
      ...getAuthHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
