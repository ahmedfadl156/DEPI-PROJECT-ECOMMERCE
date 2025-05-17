const mongoose = require('mongoose')
const Joi = require('joi')

const OrderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
});

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [OrderItemSchema],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending'
    }
}, { timestamps: true });

function validateCreateOrder(obj) {
    const schema = Joi.object({
        user: Joi.string().required(),
        items: Joi.array().items(
            Joi.object({
                product: Joi.string().required(),
                quantity: Joi.number().integer().min(1).required(),
                price: Joi.number().min(0).required()
            })
        ).min(1).required(),
        totalAmount: Joi.number().min(0).required(),
        shippingAddress: Joi.object({
            street: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            zipCode: Joi.string().required(),
            country: Joi.string().required()
        }).required(),
        paymentMethod: Joi.string().valid('credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery').required()
    });
    return schema.validate(obj);
}

function validateUpdateOrder(obj) {
    const schema = Joi.object({
        status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
        paymentStatus: Joi.string().valid('pending', 'completed', 'failed', 'refunded'),
        shippingAddress: Joi.object({
            street: Joi.string(),
            city: Joi.string(),
            state: Joi.string(),
            zipCode: Joi.string(),
            country: Joi.string()
        })
    });
    return schema.validate(obj);
}

const Order = mongoose.model('Order', OrderSchema);
module.exports = { Order, validateCreateOrder, validateUpdateOrder };