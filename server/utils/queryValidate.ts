import Joi from 'joi';

enum payStatusFilter {
    paid,
    unpaid,
    all
}

export const joiPayFilter = Joi.object().keys({
    payStatus: Joi.string().lowercase().valid(...Object.keys(payStatusFilter))
})