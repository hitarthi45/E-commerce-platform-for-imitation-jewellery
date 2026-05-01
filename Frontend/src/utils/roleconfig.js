// c:\Users\Hitarthi Pansuriya\OneDrive\Pictures\word document\E-commerce platform of imitation jewellery\Frontend\src\utils\roleConfig.js

export const roleConfig = {
  admin: {
    canAccess: {
      dashboard: true,
      production: true, // Includes Category, Product, Material
      inventory: true,
      orders: true,
      feedback: true,
    },
  },
  manufacturer: {
    canAccess: {
      dashboard: true,
      production: true, // Includes Category, Product, Material
      inventory: true,
      orders: true, // Manufacturers might need to see orders related to production
      feedback: false,
    },
  },
  retailer: {
    canAccess: {
      dashboard: true,
      production: false, // Retailers usually don't manage production/materials
      inventory: true,
      orders: true,
      feedback: true,
    },
  },
  // Default for unauthenticated or unknown roles
  guest: {
    canAccess: {
      dashboard: false,
      production: false,
      inventory: false,
      orders: false,
      feedback: false,
    },
  },
};

export const checkAccess = (role, feature) => {
  if (!role) return false;
  const userRoleConfig = roleConfig[role.toLowerCase()] || roleConfig.guest;
  return userRoleConfig.canAccess[feature] || false;
};