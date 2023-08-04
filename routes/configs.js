const prismaClient = require("../prisma/prisma");

const yup = require('yup');
const express = require('express');
const router = express.Router();

router.get('/',
    async function (req, res, next) {
        try {
            res.json({
                domains: await prismaClient.userValidDomains.findMany({
                    select: { EmailDomain: true },
                    where: { DeletedAt: null },
                }).then(result => result.map(r => r.EmailDomain)),
                tenants: await prismaClient.userValidTenants.findMany({
                    select: { TenantId: true },
                    where: { DeletedAt: null },
                }).then(result => result.map(r => r.TenantId)),
            });
        } catch (error) {
            next(error);
        }
    }
);

const configsPostValidator = yup.object({
    body: yup.object({
        domains: yup.array(yup.string().required()),
        tenants: yup.array(yup.string().required()),
    }).required()
})
router.post('/',
    async function (req, res, next) {
        const { body: { domains, tenants } } = await configsPostValidator.validate(req);

        const prismaRuns = [];
        if (domains) {
            prismaRuns.push(
                prismaClient.userValidDomains.updateMany({
                    data: {
                        DeletedAt: new Date()
                    },
                    where: {
                        EmailDomain: {
                            notIn: domains
                        }
                    }
                })
            );
            prismaRuns.push(
                ...domains.map(domain => (
                    prismaClient.userValidDomains.upsert({
                        where: { EmailDomain: domain },
                        create: { EmailDomain: domain , CreatedAt: new Date() },
                        update: { DeletedAt: null },
                    })
                ))
            )
        }
        if (tenants) {
            prismaRuns.push(
                prismaClient.userValidTenants.updateMany({
                    data: {
                        DeletedAt: new Date()
                    },
                    where: {
                        TenantId: {
                            notIn: tenants
                        }
                    }
                })
            );
            prismaRuns.push(
                ...tenants.map(tenant => (
                    prismaClient.userValidTenants.upsert({
                        where: { TenantId: tenant },
                        create: { TenantId: tenant, CreatedAt: new Date() },
                        update: { DeletedAt: null },
                    })
                ))
            )
        }
        await prismaClient.$transaction(prismaRuns);

        res.json({
            domains,
            tenants,
        });
    }
);

module.exports = router;
