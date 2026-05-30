// // API service for communicating with the backend
// // TODO: Update BASE_URL with your actual backend URL

// const BASE_URL = "http://localhost:8000"; // Change to your backend URL

// // ============ HELPER FUNCTIONS ============

// /**
//  * Get authorization headers with Bearer token
//  */
// export function getAuthHeaders() {
//   const token = localStorage.getItem("authToken");
//   return token
//     ? {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       }
//     : { "Content-Type": "application/json" };
// }

// /**
//  * Check if user is authenticated
//  */
// export function isAuthenticated() {
//   return !!localStorage.getItem("authToken");
// }

// /**
//  * Get stored user role
//  */
// export function getUserRole() {
//   return localStorage.getItem("userRole");
// }

// // ============ AUTH ENDPOINTS ============

// export async function loginUser(email: string, password: string) {
//   try {
//     // Backend expects form data, not JSON!
//     const formData = new FormData();
//     formData.append("username", email); // Backend uses "username" field for email
//     formData.append("password", password);

//     const response = await fetch(`${BASE_URL}/api/auth/login`, {
//       method: "POST",
//       body: formData, // Send as FormData, not JSON
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.detail || "Login failed");
//     }

//     const data = await response.json();
//     // Store token and user role if returned
//     if (data.access_token) {
//       localStorage.setItem("authToken", data.access_token);
//       localStorage.setItem("userRole", data.role || "traveler");
//     }
//     return data;
//   } catch (error) {
//     console.error("Login error:", error);
//     throw error;
//   }
// }

// export async function signupUser(
//   email: string,
//   password: string,
//   name: string
// ) {
//   try {
//     const response = await fetch(`${BASE_URL}/api/auth/register`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password, name }),
//     });

//     if (!response.ok) {
//       throw new Error("Signup failed");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Signup error:", error);
//     throw error;
//   }
// }

// export function logoutUser() {
//   localStorage.removeItem("authToken");
//   localStorage.removeItem("userRole");
// }

// // ============ PROFILE ENDPOINTS ============

// export async function getProfileData() {
//   try {
//     const response = await fetch(`${BASE_URL}/api/profiles/me`, {
//       method: "GET",
//       headers: getAuthHeaders(),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch profile");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Profile fetch error:", error);
//     throw error;
//   }
// }

// export async function updateProfile(data: Record<string, unknown>) {
//   try {
//     const response = await fetch(`${BASE_URL}/api/profiles/me`, {
//       method: "PUT",
//       headers: getAuthHeaders(),
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to update profile");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Profile update error:", error);
//     throw error;
//   }
// }

// // ============ PLACES ENDPOINTS ============

// export async function getAllPlaces(limit?: number) {
//   try {
//     const url = new URL(`${BASE_URL}/api/places`);
//     if (limit) {
//       url.searchParams.append("limit", limit.toString());
//     }

//     const response = await fetch(url.toString(), {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch places");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Places fetch error:", error);
//     throw error;
//   }
// }

// export async function getPlaceById(placeId: string) {
//   try {
//     const response = await fetch(`${BASE_URL}/api/places/${placeId}`, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch place");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Place fetch error:", error);
//     throw error;
//   }
// }

// // ============ WISHLIST ENDPOINTS ============

// export async function getWishlist() {
//   try {
//     const response = await fetch(`${BASE_URL}/api/wishlists`, {
//       method: "GET",
//       headers: getAuthHeaders(),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch wishlist");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Wishlist fetch error:", error);
//     throw error;
//   }
// }

// export async function addToWishlist(placeId: string) {
//   try {
//     const response = await fetch(`${BASE_URL}/api/wishlists`, {
//       method: "POST",
//       headers: getAuthHeaders(),
//       body: JSON.stringify({ place_id: placeId }),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to add to wishlist");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Add to wishlist error:", error);
//     throw error;
//   }
// }

// export async function removeFromWishlist(placeId: string) {
//   try {
//     const token = localStorage.getItem("authToken");
//     const response = await fetch(`${BASE_URL}/api/wishlists/${placeId}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to remove from wishlist");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Remove from wishlist error:", error);
//     throw error;
//   }
// }

// // ============ MEMOS/NOTES ENDPOINTS ============

// export async function getMemos() {
//   try {
//     const token = localStorage.getItem("authToken");
//     const response = await fetch(`${BASE_URL}/api/memos`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch memos");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Memos fetch error:", error);
//     throw error;
//   }
// }

// export async function createMemo(data: Record<string, unknown>) {
//   try {
//     const token = localStorage.getItem("authToken");
//     const response = await fetch(`${BASE_URL}/api/memos`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to create memo");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Memo creation error:", error);
//     throw error;
//   }
// }

// // ============ UTILITY FUNCTION ============

// export function getAuthToken(): string | null {
//   return localStorage.getItem("authToken");
// }

// export function isAuthenticated(): boolean {
//   return !!getAuthToken();
// }


// API service for communicating with the backend
// TODO: Update BASE_URL with your actual backend URL

const BASE_URL = "http://localhost:8000"; // Change to your backend URL

// ============ HELPER FUNCTIONS ============

/**
 * Get authorization headers with Bearer token
 */
export function getAuthHeaders() {
  const token = localStorage.getItem("authToken");
  return token
    ? {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    : { "Content-Type": "application/json" };
}

/**
 * Get stored user role
 */
export function getUserRole() {
  return localStorage.getItem("userRole");
}

// ============ AUTH ENDPOINTS ============

export async function loginUser(email: string, password: string) {
  try {
    // Backend uses OAuth2PasswordRequestForm, so send x-www-form-urlencoded data.
    const body = new URLSearchParams();
    body.append("username", email);
    body.append("password", password);

    const response = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      throw new Error(error?.detail || error?.message || "Login failed");
    }

    const data = await response.json();
    if (data.access_token) {
      localStorage.setItem("authToken", data.access_token);
      localStorage.setItem("userRole", data.role || "traveler");
    }
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function signupUser(
  email: string,
  password: string,
  name: string
) {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    if (!response.ok) {
      throw new Error("Signup failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}

export function logoutUser() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userRole");
}

// ============ PROFILE ENDPOINTS ============

export async function getProfileData() {
  try {
    const response = await fetch(`${BASE_URL}/api/profiles/me`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Profile fetch error:", error);
    throw error;
  }
}

export async function updateProfile(data: Record<string, unknown>) {
  try {
    const response = await fetch(`${BASE_URL}/api/profiles/me`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile");
    }

    return await response.json();
  } catch (error) {
    console.error("Profile update error:", error);
    throw error;
  }
}

// ============ PLACES ENDPOINTS ============

export async function getAllPlaces(limit?: number) {
  try {
    const url = new URL(`${BASE_URL}/api/places`);
    if (limit) {
      url.searchParams.append("limit", limit.toString());
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch places");
    }

    return await response.json();
  } catch (error) {
    console.error("Places fetch error:", error);
    throw error;
  }
}

export async function getPlaceById(placeId: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/places/${placeId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch place");
    }

    return await response.json();
  } catch (error) {
    console.error("Place fetch error:", error);
    throw error;
  }
}

// ============ WISHLIST ENDPOINTS ============

export async function getWishlist() {
  try {
    const response = await fetch(`${BASE_URL}/api/wishlists`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch wishlist");
    }

    return await response.json();
  } catch (error) {
    console.error("Wishlist fetch error:", error);
    throw error;
  }
}

export async function addToWishlist(placeId: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/wishlists`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ place_id: placeId }),
    });

    if (!response.ok) {
      throw new Error("Failed to add to wishlist");
    }

    return await response.json();
  } catch (error) {
    console.error("Add to wishlist error:", error);
    throw error;
  }
}

export async function removeFromWishlist(placeId: string) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${BASE_URL}/api/wishlists/${placeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to remove from wishlist");
    }

    return await response.json();
  } catch (error) {
    console.error("Remove from wishlist error:", error);
    throw error;
  }
}

// ============ MEMOS/NOTES ENDPOINTS ============

export async function getMemos() {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${BASE_URL}/api/memos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch memos");
    }

    return await response.json();
  } catch (error) {
    console.error("Memos fetch error:", error);
    throw error;
  }
}

export async function createMemo(data: Record<string, unknown>) {
  try {
    const token = localStorage.getItem("authToken");
    const response = await fetch(`${BASE_URL}/api/memos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create memo");
    }

    return await response.json();
  } catch (error) {
    console.error("Memo creation error:", error);
    throw error;
  }
}

// ============ UTILITY FUNCTIONS ============

export function getAuthToken(): string | null {
  return localStorage.getItem("authToken");
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

// ---------- Profile helpers ----------
export async function updateBio(bio: string) {
  try {
    const response = await fetch(`${BASE_URL}/api/profiles/update-bio`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ bio }),
    });

    if (!response.ok) {
      throw new Error("Failed to update bio");
    }

    return await response.json();
  } catch (error) {
    console.error("Update bio error:", error);
    throw error;
  }
}