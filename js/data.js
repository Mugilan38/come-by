const mockProducts = [
    {
      "id": 1,
      "name": "AeroStep Hover Sneakers",
      "category": "Shoes",
      "price": 299.99,
      "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=60",
      "description": "Next-gen anti-gravity footwear that neutralizes localized gravity fields.",
      "rating": 4.8,
      "specifications": { "weight": "0.5kg", "batteryLife": "24 hours", "material": "Nano-fiber" }
    },
    {
      "id": 2,
      "name": "Lumina Levitation Lamp",
      "category": "Lamps",
      "price": 149.99,
      "image": "https://images.unsplash.com/photo-1517999163351-cc28ac24ee8d?w=600&auto=format&fit=crop&q=60",
      "description": "A self-suspending magnetic light source that floats gracefully above your desk.",
      "rating": 4.5,
      "specifications": { "power": "15W LED", "levitationHeight": "5cm", "colors": "RGB" }
    },
    {
      "id": 3,
      "name": "Nimbus Prime Hoverboard",
      "category": "Hoverboards",
      "price": 899.99,
      "image": "https://images.unsplash.com/photo-1590005080076-24e0307040d8?w=600&auto=format&fit=crop&q=60",
      "description": "The ultimate personal transport vehicle utilizing grav-repulse engines.",
      "rating": 4.9,
      "specifications": { "speed": "40 km/h", "range": "30 km", "chargeTime": "2 hours" }
    },
    {
      "id": 4,
      "name": "Grav-Modulator Glove",
      "category": "Gadgets",
      "price": 499.99,
      "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60",
      "description": "Interact with surrounding mass fields to lift objects up to 50kg effortlessly.",
      "rating": 4.7,
      "specifications": { "liftCapacity": "50kg", "batteryLife": "4 hours", "size": "Adjustable" }
    },
    {
      "id": 5,
      "name": "Orbital Smart Watch",
      "category": "Accessories",
      "price": 199.99,
      "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60",
      "description": "A wrist accessory that projects a holographic interface without a screen.",
      "rating": 4.6,
      "specifications": { "display": "Holographic", "connectivity": "Quantum Sync", "waterproof": "Yes" }
    },
    {
      "id": 6,
      "name": "Zero-G Sleep Pod",
      "category": "Accessories",
      "price": 1299.99,
      "image": "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&auto=format&fit=crop&q=60",
      "description": "Experience true weightlessness for the best sleep of your life.",
      "rating": 5.0,
      "specifications": { "dimensions": "2m x 1m", "climateControl": "Yes", "noiseCancellation": "Active" }
    }
];

// Helper to simulate API call
async function fetchProducts() {
    return new Promise(resolve => {
        setTimeout(() => resolve(mockProducts), 300); // simulate network
    });
}

async function fetchRecommendations() {
    return new Promise(resolve => {
        const shuffled = [...mockProducts].sort(() => 0.5 - Math.random());
        setTimeout(() => resolve(shuffled.slice(0, 3)), 300);
    });
}
