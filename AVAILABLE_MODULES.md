# Available Modules in Medusa v2

Medusa v2 comes with pre-built commerce modules that are included by default. You don't need to install them separately - they're part of `@medusajs/medusa`.

## 📦 Built-in Commerce Modules

Based on your codebase, the following modules are available:

### 1. **CURRENCY** ✓
- Manages currencies and currency codes
- Used for: Multi-currency support, exchange rates
- Status: **Already in use** (BDT support added)

### 2. **STORE** ✓
- Manages store configuration
- Used for: Store settings, supported currencies
- Status: **In use**

### 3. **FULFILLMENT** ✓
- Handles shipping and delivery
- Used for: Shipping options, fulfillment providers
- Status: **In use**

### 4. **SALES_CHANNEL** ✓
- Manages sales channels
- Used for: Multi-channel selling
- Status: **In use**

### 5. **STOCK_LOCATION** ✓
- Manages inventory locations
- Used for: Warehouses, stock management
- Status: **In use**

## 🔍 Other Available Modules

According to Medusa documentation, these modules are also available:

### 6. **Cart & Purchase**
- Handles checkout processes
- Total calculations
- Cart management

### 7. **Product**
- Product catalog
- Variants and options
- Product categories

### 8. **Order**
- Order management
- Order fulfillment
- Order status tracking

### 9. **Inventory**
- Stock management
- Inventory tracking
- Stock locations

### 10. **Payment**
- Payment processing
- Payment providers
- Transaction management

### 11. **Auth**
- Authentication
- User management
- API keys

### 12. **File**
- File storage
- Asset management
- Media handling

## 🚫 Do NOT Install Modules Separately

**Important:** All these modules come bundled with `@medusajs/medusa`. You should **NOT** try to install them as separate packages. They're part of the core framework.

## ✅ Your Current Setup

Looking at your `medusa-config.ts`, you're using the default modules configuration. All modules are automatically available through `Modules` from `@medusajs/framework/utils`.

## 📝 How to Use Modules

You can access modules in your code like this:

```typescript
import { Modules } from "@medusajs/framework/utils";

// In a workflow or script:
const currencyModuleService = container.resolve(Modules.CURRENCY);
const storeModuleService = container.resolve(Modules.STORE);
const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
```

## 🔧 Adding Custom Modules

If you want to create **custom modules**, you can do so by:

1. Create module in `src/modules/`
2. Add to `medusa-config.ts` modules array
3. Generate migrations: `npx medusa db:generate <module-name>`
4. Run migrations: `npx medusa db:migrate`

Example `medusa-config.ts`:
```typescript
module.exports = defineConfig({
  projectConfig: {
    // ... your config
  },
  modules: [
    {
      resolve: "./src/modules/your-custom-module",
    },
  ],
});
```

## 📚 Resources

- [Medusa Modules Overview](https://docs.medusajs.com/learn/fundamentals/modules)
- [Commerce Modules](https://docs.medusajs.com/resources/commerce-modules)
- [Creating Custom Modules](https://docs.medusajs.com/resources/plugins)

## ✨ Your BDT Implementation

The BDT currency support you added uses the built-in `CURRENCY` module. No additional installation needed - it's already working!

