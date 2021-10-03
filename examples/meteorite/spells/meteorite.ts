import { Categories, TicksPerSecond } from "../../../src/mod.ts";
const meteoriteProjectile: ProjectileTemplate = {
  density: 50,
  square: true,
  ccd: false,
  attractable: false,
  swappable: true,
  linkable: true,
  radius: 0.018,
  speed: 0.3,
  speedDecayPerTick: 0.2,
  restitution: 0,
  minTicks: 1,
  maxTicks: 2 * TicksPerSecond,
  hitInterval: 120,
  damage: 0,
  shieldTakesOwnership: false,
  categories: Categories.Projectile | Categories.Massive,
  collideWith: Categories.All ^ Categories.Shield, // Shields have no effect on Meteorite
  expireOn: Categories.None,

  sound: "meteorite",
  color: "#ff0066",
  renderers: [
    { type: "bloom", radius: 0.04 },
    {
      type: "projectile",
      ticks: 12,
      light: null,
      shine: 0,
      smoke: 0.5,
      fade: "#333",
      shadow: 0.5,
    },
    { type: "strike", ticks: 12, flash: true, growth: 0.1 },
  ],
};
export const meteorite: Spell = {
  id: "meteorite",
  description:
    "Send a little meteorite towards your enemies! Meteorite will split in two if it collides with any other projectiles.",
  action: "projectile",

  color: "#ff0066",
  icon: "fragmentedMeteor",

  maxAngleDiffInRevs: 0.01,
  cooldown: 7.5 * TicksPerSecond,
  throttle: true,

  projectile: {
    ...meteoriteProjectile,

    behaviours: [
      {
        type: "spawn",
        trigger: {
          collideWith: Categories.Projectile | Categories.Shield,
        },
        projectile: {
          ...meteoriteProjectile,
          sound: "submeteorite",
          maxTicks: 60,
          radius: 0.5 * meteoriteProjectile.radius,
        },
        numProjectiles: 2,
        spread: 0.04,
        expire: true,
      },
    ],
  },
};
