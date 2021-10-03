import { Categories, TicksPerSecond } from "../../../src/mod.ts";
export const spell1: Spell = {
    id: 'spell1',
    description: "spell1",
    action: "projectile",

    color: '#f80',
    icon: "thunderball",

    maxAngleDiffInRevs: 0.01,
    cooldown: 1.5 * TicksPerSecond,
    throttle: true,

    projectile: {
        density: 25,
        radius: 0.003,
        speed: 0.6,
        maxTicks: 1.5 * TicksPerSecond,
        damage: 16,
        lifeSteal: 0.15,
        categories: Categories.Projectile,

        sound: "fireball",
        soundHit: "standard",
        color: '#f80',
        renderers: [
            { type: "bloom", radius: 0.045 },
            { type: "projectile", ticks: 30, smoke: 0.05 },
            { type: "ray", ticks: 30 },
            { type: "strike", ticks: 30, flash: true, numParticles: 5 },
        ],
    },
};