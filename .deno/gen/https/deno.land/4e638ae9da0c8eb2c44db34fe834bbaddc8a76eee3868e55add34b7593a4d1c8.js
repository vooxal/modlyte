export const SEMVER_SPEC_VERSION = "2.0.0";
const MAX_LENGTH = 256;
const MAX_SAFE_COMPONENT_LENGTH = 16;
const re = [];
const src = [];
let R = 0;
const NUMERICIDENTIFIER = R++;
src[NUMERICIDENTIFIER] = "0|[1-9]\\d*";
const NUMERICIDENTIFIERLOOSE = R++;
src[NUMERICIDENTIFIERLOOSE] = "[0-9]+";
const NONNUMERICIDENTIFIER = R++;
src[NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
const MAINVERSION = R++;
const nid = src[NUMERICIDENTIFIER];
src[MAINVERSION] = `(${nid})\\.(${nid})\\.(${nid})`;
const MAINVERSIONLOOSE = R++;
const nidl = src[NUMERICIDENTIFIERLOOSE];
src[MAINVERSIONLOOSE] = `(${nidl})\\.(${nidl})\\.(${nidl})`;
const PRERELEASEIDENTIFIER = R++;
src[PRERELEASEIDENTIFIER] = "(?:" + src[NUMERICIDENTIFIER] + "|" +
  src[NONNUMERICIDENTIFIER] + ")";
const PRERELEASEIDENTIFIERLOOSE = R++;
src[PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[NUMERICIDENTIFIERLOOSE] + "|" +
  src[NONNUMERICIDENTIFIER] + ")";
const PRERELEASE = R++;
src[PRERELEASE] = "(?:-(" +
  src[PRERELEASEIDENTIFIER] +
  "(?:\\." +
  src[PRERELEASEIDENTIFIER] +
  ")*))";
const PRERELEASELOOSE = R++;
src[PRERELEASELOOSE] = "(?:-?(" +
  src[PRERELEASEIDENTIFIERLOOSE] +
  "(?:\\." +
  src[PRERELEASEIDENTIFIERLOOSE] +
  ")*))";
const BUILDIDENTIFIER = R++;
src[BUILDIDENTIFIER] = "[0-9A-Za-z-]+";
const BUILD = R++;
src[BUILD] = "(?:\\+(" + src[BUILDIDENTIFIER] + "(?:\\." +
  src[BUILDIDENTIFIER] + ")*))";
const FULL = R++;
const FULLPLAIN = "v?" + src[MAINVERSION] + src[PRERELEASE] + "?" + src[BUILD] +
  "?";
src[FULL] = "^" + FULLPLAIN + "$";
const LOOSEPLAIN = "[v=\\s]*" +
  src[MAINVERSIONLOOSE] +
  src[PRERELEASELOOSE] +
  "?" +
  src[BUILD] +
  "?";
const LOOSE = R++;
src[LOOSE] = "^" + LOOSEPLAIN + "$";
const GTLT = R++;
src[GTLT] = "((?:<|>)?=?)";
const XRANGEIDENTIFIERLOOSE = R++;
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
const XRANGEIDENTIFIER = R++;
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + "|x|X|\\*";
const XRANGEPLAIN = R++;
src[XRANGEPLAIN] = "[v=\\s]*(" +
  src[XRANGEIDENTIFIER] +
  ")" +
  "(?:\\.(" +
  src[XRANGEIDENTIFIER] +
  ")" +
  "(?:\\.(" +
  src[XRANGEIDENTIFIER] +
  ")" +
  "(?:" +
  src[PRERELEASE] +
  ")?" +
  src[BUILD] +
  "?" +
  ")?)?";
const XRANGEPLAINLOOSE = R++;
src[XRANGEPLAINLOOSE] = "[v=\\s]*(" +
  src[XRANGEIDENTIFIERLOOSE] +
  ")" +
  "(?:\\.(" +
  src[XRANGEIDENTIFIERLOOSE] +
  ")" +
  "(?:\\.(" +
  src[XRANGEIDENTIFIERLOOSE] +
  ")" +
  "(?:" +
  src[PRERELEASELOOSE] +
  ")?" +
  src[BUILD] +
  "?" +
  ")?)?";
const XRANGE = R++;
src[XRANGE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAIN] + "$";
const XRANGELOOSE = R++;
src[XRANGELOOSE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAINLOOSE] + "$";
const COERCE = R++;
src[COERCE] = "(?:^|[^\\d])" +
  "(\\d{1," +
  MAX_SAFE_COMPONENT_LENGTH +
  "})" +
  "(?:\\.(\\d{1," +
  MAX_SAFE_COMPONENT_LENGTH +
  "}))?" +
  "(?:\\.(\\d{1," +
  MAX_SAFE_COMPONENT_LENGTH +
  "}))?" +
  "(?:$|[^\\d])";
const LONETILDE = R++;
src[LONETILDE] = "(?:~>?)";
const TILDETRIM = R++;
src[TILDETRIM] = "(\\s*)" + src[LONETILDE] + "\\s+";
re[TILDETRIM] = new RegExp(src[TILDETRIM], "g");
const tildeTrimReplace = "$1~";
const TILDE = R++;
src[TILDE] = "^" + src[LONETILDE] + src[XRANGEPLAIN] + "$";
const TILDELOOSE = R++;
src[TILDELOOSE] = "^" + src[LONETILDE] + src[XRANGEPLAINLOOSE] + "$";
const LONECARET = R++;
src[LONECARET] = "(?:\\^)";
const CARETTRIM = R++;
src[CARETTRIM] = "(\\s*)" + src[LONECARET] + "\\s+";
re[CARETTRIM] = new RegExp(src[CARETTRIM], "g");
const caretTrimReplace = "$1^";
const CARET = R++;
src[CARET] = "^" + src[LONECARET] + src[XRANGEPLAIN] + "$";
const CARETLOOSE = R++;
src[CARETLOOSE] = "^" + src[LONECARET] + src[XRANGEPLAINLOOSE] + "$";
const COMPARATORLOOSE = R++;
src[COMPARATORLOOSE] = "^" + src[GTLT] + "\\s*(" + LOOSEPLAIN + ")$|^$";
const COMPARATOR = R++;
src[COMPARATOR] = "^" + src[GTLT] + "\\s*(" + FULLPLAIN + ")$|^$";
const COMPARATORTRIM = R++;
src[COMPARATORTRIM] = "(\\s*)" + src[GTLT] + "\\s*(" + LOOSEPLAIN + "|" +
  src[XRANGEPLAIN] + ")";
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], "g");
const comparatorTrimReplace = "$1$2$3";
const HYPHENRANGE = R++;
src[HYPHENRANGE] = "^\\s*(" +
  src[XRANGEPLAIN] +
  ")" +
  "\\s+-\\s+" +
  "(" +
  src[XRANGEPLAIN] +
  ")" +
  "\\s*$";
const HYPHENRANGELOOSE = R++;
src[HYPHENRANGELOOSE] = "^\\s*(" +
  src[XRANGEPLAINLOOSE] +
  ")" +
  "\\s+-\\s+" +
  "(" +
  src[XRANGEPLAINLOOSE] +
  ")" +
  "\\s*$";
const STAR = R++;
src[STAR] = "(<|>)?=?\\s*\\*";
for (let i = 0; i < R; i++) {
  if (!re[i]) {
    re[i] = new RegExp(src[i]);
  }
}
export function parse(version, optionsOrLoose) {
  if (!optionsOrLoose || typeof optionsOrLoose !== "object") {
    optionsOrLoose = {
      loose: !!optionsOrLoose,
      includePrerelease: false,
    };
  }
  if (version instanceof SemVer) {
    return version;
  }
  if (typeof version !== "string") {
    return null;
  }
  if (version.length > MAX_LENGTH) {
    return null;
  }
  const r = optionsOrLoose.loose ? re[LOOSE] : re[FULL];
  if (!r.test(version)) {
    return null;
  }
  try {
    return new SemVer(version, optionsOrLoose);
  } catch (er) {
    return null;
  }
}
export function valid(version, optionsOrLoose) {
  if (version === null) {
    return null;
  }
  const v = parse(version, optionsOrLoose);
  return v ? v.version : null;
}
export function clean(version, optionsOrLoose) {
  const s = parse(version.trim().replace(/^[=v]+/, ""), optionsOrLoose);
  return s ? s.version : null;
}
export class SemVer {
  raw;
  loose;
  options;
  major;
  minor;
  patch;
  version;
  build;
  prerelease;
  constructor(version, optionsOrLoose) {
    if (!optionsOrLoose || typeof optionsOrLoose !== "object") {
      optionsOrLoose = {
        loose: !!optionsOrLoose,
        includePrerelease: false,
      };
    }
    if (version instanceof SemVer) {
      if (version.loose === optionsOrLoose.loose) {
        return version;
      } else {
        version = version.version;
      }
    } else if (typeof version !== "string") {
      throw new TypeError("Invalid Version: " + version);
    }
    if (version.length > MAX_LENGTH) {
      throw new TypeError(
        "version is longer than " + MAX_LENGTH + " characters",
      );
    }
    if (!(this instanceof SemVer)) {
      return new SemVer(version, optionsOrLoose);
    }
    this.options = optionsOrLoose;
    this.loose = !!optionsOrLoose.loose;
    const m = version.trim().match(optionsOrLoose.loose ? re[LOOSE] : re[FULL]);
    if (!m) {
      throw new TypeError("Invalid Version: " + version);
    }
    this.raw = version;
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];
    if (this.major > Number.MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError("Invalid major version");
    }
    if (this.minor > Number.MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError("Invalid minor version");
    }
    if (this.patch > Number.MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError("Invalid patch version");
    }
    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split(".").map((id) => {
        if (/^[0-9]+$/.test(id)) {
          const num = +id;
          if (num >= 0 && num < Number.MAX_SAFE_INTEGER) {
            return num;
          }
        }
        return id;
      });
    }
    this.build = m[5] ? m[5].split(".") : [];
    this.format();
  }
  format() {
    this.version = this.major + "." + this.minor + "." + this.patch;
    if (this.prerelease.length) {
      this.version += "-" + this.prerelease.join(".");
    }
    return this.version;
  }
  compare(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    return this.compareMain(other) || this.comparePre(other);
  }
  compareMain(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    return (compareIdentifiers(this.major, other.major) ||
      compareIdentifiers(this.minor, other.minor) ||
      compareIdentifiers(this.patch, other.patch));
  }
  comparePre(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    if (this.prerelease.length && !other.prerelease.length) {
      return -1;
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1;
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0;
    }
    let i = 0;
    do {
      const a = this.prerelease[i];
      const b = other.prerelease[i];
      if (a === undefined && b === undefined) {
        return 0;
      } else if (b === undefined) {
        return 1;
      } else if (a === undefined) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
    return 1;
  }
  compareBuild(other) {
    if (!(other instanceof SemVer)) {
      other = new SemVer(other, this.options);
    }
    let i = 0;
    do {
      const a = this.build[i];
      const b = other.build[i];
      if (a === undefined && b === undefined) {
        return 0;
      } else if (b === undefined) {
        return 1;
      } else if (a === undefined) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
    return 1;
  }
  inc(release, identifier) {
    switch (release) {
      case "premajor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc("pre", identifier);
        break;
      case "preminor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc("pre", identifier);
        break;
      case "prepatch":
        this.prerelease.length = 0;
        this.inc("patch", identifier);
        this.inc("pre", identifier);
        break;
      case "prerelease":
        if (this.prerelease.length === 0) {
          this.inc("patch", identifier);
        }
        this.inc("pre", identifier);
        break;
      case "major":
        if (
          this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0
        ) {
          this.major++;
        }
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case "minor":
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }
        this.patch = 0;
        this.prerelease = [];
        break;
      case "patch":
        if (this.prerelease.length === 0) {
          this.patch++;
        }
        this.prerelease = [];
        break;
      case "pre":
        if (this.prerelease.length === 0) {
          this.prerelease = [0];
        } else {
          let i = this.prerelease.length;
          while (--i >= 0) {
            if (typeof this.prerelease[i] === "number") {
              this.prerelease[i]++;
              i = -2;
            }
          }
          if (i === -1) {
            this.prerelease.push(0);
          }
        }
        if (identifier) {
          if (this.prerelease[0] === identifier) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = [identifier, 0];
            }
          } else {
            this.prerelease = [identifier, 0];
          }
        }
        break;
      default:
        throw new Error("invalid increment argument: " + release);
    }
    this.format();
    this.raw = this.version;
    return this;
  }
  toString() {
    return this.version;
  }
}
export function inc(version, release, optionsOrLoose, identifier) {
  if (typeof optionsOrLoose === "string") {
    identifier = optionsOrLoose;
    optionsOrLoose = undefined;
  }
  try {
    return new SemVer(version, optionsOrLoose).inc(release, identifier).version;
  } catch (er) {
    return null;
  }
}
export function diff(version1, version2, optionsOrLoose) {
  if (eq(version1, version2, optionsOrLoose)) {
    return null;
  } else {
    const v1 = parse(version1);
    const v2 = parse(version2);
    let prefix = "";
    let defaultResult = null;
    if (v1 && v2) {
      if (v1.prerelease.length || v2.prerelease.length) {
        prefix = "pre";
        defaultResult = "prerelease";
      }
      for (const key in v1) {
        if (key === "major" || key === "minor" || key === "patch") {
          if (v1[key] !== v2[key]) {
            return (prefix + key);
          }
        }
      }
    }
    return defaultResult;
  }
}
const numeric = /^[0-9]+$/;
export function compareIdentifiers(a, b) {
  const anum = numeric.test(a);
  const bnum = numeric.test(b);
  if (a === null || b === null) {
    throw "Comparison against null invalid";
  }
  if (anum && bnum) {
    a = +a;
    b = +b;
  }
  return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
}
export function rcompareIdentifiers(a, b) {
  return compareIdentifiers(b, a);
}
export function major(v, optionsOrLoose) {
  return new SemVer(v, optionsOrLoose).major;
}
export function minor(v, optionsOrLoose) {
  return new SemVer(v, optionsOrLoose).minor;
}
export function patch(v, optionsOrLoose) {
  return new SemVer(v, optionsOrLoose).patch;
}
export function compare(v1, v2, optionsOrLoose) {
  return new SemVer(v1, optionsOrLoose).compare(new SemVer(v2, optionsOrLoose));
}
export function compareLoose(a, b) {
  return compare(a, b, true);
}
export function compareBuild(a, b, loose) {
  var versionA = new SemVer(a, loose);
  var versionB = new SemVer(b, loose);
  return versionA.compare(versionB) || versionA.compareBuild(versionB);
}
export function rcompare(v1, v2, optionsOrLoose) {
  return compare(v2, v1, optionsOrLoose);
}
export function sort(list, optionsOrLoose) {
  return list.sort((a, b) => {
    return compareBuild(a, b, optionsOrLoose);
  });
}
export function rsort(list, optionsOrLoose) {
  return list.sort((a, b) => {
    return compareBuild(b, a, optionsOrLoose);
  });
}
export function gt(v1, v2, optionsOrLoose) {
  return compare(v1, v2, optionsOrLoose) > 0;
}
export function lt(v1, v2, optionsOrLoose) {
  return compare(v1, v2, optionsOrLoose) < 0;
}
export function eq(v1, v2, optionsOrLoose) {
  return compare(v1, v2, optionsOrLoose) === 0;
}
export function neq(v1, v2, optionsOrLoose) {
  return compare(v1, v2, optionsOrLoose) !== 0;
}
export function gte(v1, v2, optionsOrLoose) {
  return compare(v1, v2, optionsOrLoose) >= 0;
}
export function lte(v1, v2, optionsOrLoose) {
  return compare(v1, v2, optionsOrLoose) <= 0;
}
export function cmp(v1, operator, v2, optionsOrLoose) {
  switch (operator) {
    case "===":
      if (typeof v1 === "object") {
        v1 = v1.version;
      }
      if (typeof v2 === "object") {
        v2 = v2.version;
      }
      return v1 === v2;
    case "!==":
      if (typeof v1 === "object") {
        v1 = v1.version;
      }
      if (typeof v2 === "object") {
        v2 = v2.version;
      }
      return v1 !== v2;
    case "":
    case "=":
    case "==":
      return eq(v1, v2, optionsOrLoose);
    case "!=":
      return neq(v1, v2, optionsOrLoose);
    case ">":
      return gt(v1, v2, optionsOrLoose);
    case ">=":
      return gte(v1, v2, optionsOrLoose);
    case "<":
      return lt(v1, v2, optionsOrLoose);
    case "<=":
      return lte(v1, v2, optionsOrLoose);
    default:
      throw new TypeError("Invalid operator: " + operator);
  }
}
const ANY = {};
export class Comparator {
  semver;
  operator;
  value;
  loose;
  options;
  constructor(comp, optionsOrLoose) {
    if (!optionsOrLoose || typeof optionsOrLoose !== "object") {
      optionsOrLoose = {
        loose: !!optionsOrLoose,
        includePrerelease: false,
      };
    }
    if (comp instanceof Comparator) {
      if (comp.loose === !!optionsOrLoose.loose) {
        return comp;
      } else {
        comp = comp.value;
      }
    }
    if (!(this instanceof Comparator)) {
      return new Comparator(comp, optionsOrLoose);
    }
    this.options = optionsOrLoose;
    this.loose = !!optionsOrLoose.loose;
    this.parse(comp);
    if (this.semver === ANY) {
      this.value = "";
    } else {
      this.value = this.operator + this.semver.version;
    }
  }
  parse(comp) {
    const r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
    const m = comp.match(r);
    if (!m) {
      throw new TypeError("Invalid comparator: " + comp);
    }
    const m1 = m[1];
    this.operator = m1 !== undefined ? m1 : "";
    if (this.operator === "=") {
      this.operator = "";
    }
    if (!m[2]) {
      this.semver = ANY;
    } else {
      this.semver = new SemVer(m[2], this.options.loose);
    }
  }
  test(version) {
    if (this.semver === ANY || version === ANY) {
      return true;
    }
    if (typeof version === "string") {
      version = new SemVer(version, this.options);
    }
    return cmp(version, this.operator, this.semver, this.options);
  }
  intersects(comp, optionsOrLoose) {
    if (!(comp instanceof Comparator)) {
      throw new TypeError("a Comparator is required");
    }
    if (!optionsOrLoose || typeof optionsOrLoose !== "object") {
      optionsOrLoose = {
        loose: !!optionsOrLoose,
        includePrerelease: false,
      };
    }
    let rangeTmp;
    if (this.operator === "") {
      if (this.value === "") {
        return true;
      }
      rangeTmp = new Range(comp.value, optionsOrLoose);
      return satisfies(this.value, rangeTmp, optionsOrLoose);
    } else if (comp.operator === "") {
      if (comp.value === "") {
        return true;
      }
      rangeTmp = new Range(this.value, optionsOrLoose);
      return satisfies(comp.semver, rangeTmp, optionsOrLoose);
    }
    const sameDirectionIncreasing =
      (this.operator === ">=" || this.operator === ">") &&
      (comp.operator === ">=" || comp.operator === ">");
    const sameDirectionDecreasing =
      (this.operator === "<=" || this.operator === "<") &&
      (comp.operator === "<=" || comp.operator === "<");
    const sameSemVer = this.semver.version === comp.semver.version;
    const differentDirectionsInclusive =
      (this.operator === ">=" || this.operator === "<=") &&
      (comp.operator === ">=" || comp.operator === "<=");
    const oppositeDirectionsLessThan =
      cmp(this.semver, "<", comp.semver, optionsOrLoose) &&
      (this.operator === ">=" || this.operator === ">") &&
      (comp.operator === "<=" || comp.operator === "<");
    const oppositeDirectionsGreaterThan =
      cmp(this.semver, ">", comp.semver, optionsOrLoose) &&
      (this.operator === "<=" || this.operator === "<") &&
      (comp.operator === ">=" || comp.operator === ">");
    return (sameDirectionIncreasing ||
      sameDirectionDecreasing ||
      (sameSemVer && differentDirectionsInclusive) ||
      oppositeDirectionsLessThan ||
      oppositeDirectionsGreaterThan);
  }
  toString() {
    return this.value;
  }
}
export class Range {
  range;
  raw;
  loose;
  options;
  includePrerelease;
  set;
  constructor(range, optionsOrLoose) {
    if (!optionsOrLoose || typeof optionsOrLoose !== "object") {
      optionsOrLoose = {
        loose: !!optionsOrLoose,
        includePrerelease: false,
      };
    }
    if (range instanceof Range) {
      if (
        range.loose === !!optionsOrLoose.loose &&
        range.includePrerelease === !!optionsOrLoose.includePrerelease
      ) {
        return range;
      } else {
        return new Range(range.raw, optionsOrLoose);
      }
    }
    if (range instanceof Comparator) {
      return new Range(range.value, optionsOrLoose);
    }
    if (!(this instanceof Range)) {
      return new Range(range, optionsOrLoose);
    }
    this.options = optionsOrLoose;
    this.loose = !!optionsOrLoose.loose;
    this.includePrerelease = !!optionsOrLoose.includePrerelease;
    this.raw = range;
    this.set = range
      .split(/\s*\|\|\s*/)
      .map((range) => this.parseRange(range.trim()))
      .filter((c) => {
        return c.length;
      });
    if (!this.set.length) {
      throw new TypeError("Invalid SemVer Range: " + range);
    }
    this.format();
  }
  format() {
    this.range = this.set
      .map((comps) => comps.join(" ").trim())
      .join("||")
      .trim();
    return this.range;
  }
  parseRange(range) {
    const loose = this.options.loose;
    range = range.trim();
    const hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
    range = range.replace(hr, hyphenReplace);
    range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
    range = range.replace(re[TILDETRIM], tildeTrimReplace);
    range = range.replace(re[CARETTRIM], caretTrimReplace);
    range = range.split(/\s+/).join(" ");
    const compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
    let set = range
      .split(" ")
      .map((comp) => parseComparator(comp, this.options))
      .join(" ")
      .split(/\s+/);
    if (this.options.loose) {
      set = set.filter((comp) => {
        return !!comp.match(compRe);
      });
    }
    return set.map((comp) => new Comparator(comp, this.options));
  }
  test(version) {
    if (typeof version === "string") {
      version = new SemVer(version, this.options);
    }
    for (var i = 0; i < this.set.length; i++) {
      if (testSet(this.set[i], version, this.options)) {
        return true;
      }
    }
    return false;
  }
  intersects(range, optionsOrLoose) {
    if (!(range instanceof Range)) {
      throw new TypeError("a Range is required");
    }
    return this.set.some((thisComparators) => {
      return (isSatisfiable(thisComparators, optionsOrLoose) &&
        range.set.some((rangeComparators) => {
          return (isSatisfiable(rangeComparators, optionsOrLoose) &&
            thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(
                  rangeComparator,
                  optionsOrLoose,
                );
              });
            }));
        }));
    });
  }
  toString() {
    return this.range;
  }
}
function testSet(set, version, options) {
  for (let i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false;
    }
  }
  if (version.prerelease.length && !options.includePrerelease) {
    for (let i = 0; i < set.length; i++) {
      if (set[i].semver === ANY) {
        continue;
      }
      if (set[i].semver.prerelease.length > 0) {
        const allowed = set[i].semver;
        if (
          allowed.major === version.major &&
          allowed.minor === version.minor &&
          allowed.patch === version.patch
        ) {
          return true;
        }
      }
    }
    return false;
  }
  return true;
}
function isSatisfiable(comparators, options) {
  let result = true;
  const remainingComparators = comparators.slice();
  let testComparator = remainingComparators.pop();
  while (result && remainingComparators.length) {
    result = remainingComparators.every((otherComparator) => {
      return testComparator?.intersects(otherComparator, options);
    });
    testComparator = remainingComparators.pop();
  }
  return result;
}
export function toComparators(range, optionsOrLoose) {
  return new Range(range, optionsOrLoose).set.map((comp) => {
    return comp
      .map((c) => c.value)
      .join(" ")
      .trim()
      .split(" ");
  });
}
function parseComparator(comp, options) {
  comp = replaceCarets(comp, options);
  comp = replaceTildes(comp, options);
  comp = replaceXRanges(comp, options);
  comp = replaceStars(comp, options);
  return comp;
}
function isX(id) {
  return !id || id.toLowerCase() === "x" || id === "*";
}
function replaceTildes(comp, options) {
  return comp
    .trim()
    .split(/\s+/)
    .map((comp) => replaceTilde(comp, options))
    .join(" ");
}
function replaceTilde(comp, options) {
  const r = options.loose ? re[TILDELOOSE] : re[TILDE];
  return comp.replace(r, (_, M, m, p, pr) => {
    let ret;
    if (isX(M)) {
      ret = "";
    } else if (isX(m)) {
      ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
    } else if (isX(p)) {
      ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
    } else if (pr) {
      ret = ">=" +
        M +
        "." +
        m +
        "." +
        p +
        "-" +
        pr +
        " <" +
        M +
        "." +
        (+m + 1) +
        ".0";
    } else {
      ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
    }
    return ret;
  });
}
function replaceCarets(comp, options) {
  return comp
    .trim()
    .split(/\s+/)
    .map((comp) => replaceCaret(comp, options))
    .join(" ");
}
function replaceCaret(comp, options) {
  const r = options.loose ? re[CARETLOOSE] : re[CARET];
  return comp.replace(r, (_, M, m, p, pr) => {
    let ret;
    if (isX(M)) {
      ret = "";
    } else if (isX(m)) {
      ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
    } else if (isX(p)) {
      if (M === "0") {
        ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
      } else {
        ret = ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0";
      }
    } else if (pr) {
      if (M === "0") {
        if (m === "0") {
          ret = ">=" +
            M +
            "." +
            m +
            "." +
            p +
            "-" +
            pr +
            " <" +
            M +
            "." +
            m +
            "." +
            (+p + 1);
        } else {
          ret = ">=" +
            M +
            "." +
            m +
            "." +
            p +
            "-" +
            pr +
            " <" +
            M +
            "." +
            (+m + 1) +
            ".0";
        }
      } else {
        ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + (+M + 1) +
          ".0.0";
      }
    } else {
      if (M === "0") {
        if (m === "0") {
          ret = ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." +
            (+p + 1);
        } else {
          ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
        }
      } else {
        ret = ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0";
      }
    }
    return ret;
  });
}
function replaceXRanges(comp, options) {
  return comp
    .split(/\s+/)
    .map((comp) => replaceXRange(comp, options))
    .join(" ");
}
function replaceXRange(comp, options) {
  comp = comp.trim();
  const r = options.loose ? re[XRANGELOOSE] : re[XRANGE];
  return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
    const xM = isX(M);
    const xm = xM || isX(m);
    const xp = xm || isX(p);
    const anyX = xp;
    if (gtlt === "=" && anyX) {
      gtlt = "";
    }
    if (xM) {
      if (gtlt === ">" || gtlt === "<") {
        ret = "<0.0.0";
      } else {
        ret = "*";
      }
    } else if (gtlt && anyX) {
      if (xm) {
        m = 0;
      }
      p = 0;
      if (gtlt === ">") {
        gtlt = ">=";
        if (xm) {
          M = +M + 1;
          m = 0;
          p = 0;
        } else {
          m = +m + 1;
          p = 0;
        }
      } else if (gtlt === "<=") {
        gtlt = "<";
        if (xm) {
          M = +M + 1;
        } else {
          m = +m + 1;
        }
      }
      ret = gtlt + M + "." + m + "." + p;
    } else if (xm) {
      ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
    } else if (xp) {
      ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
    }
    return ret;
  });
}
function replaceStars(comp, options) {
  return comp.trim().replace(re[STAR], "");
}
function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
  if (isX(fM)) {
    from = "";
  } else if (isX(fm)) {
    from = ">=" + fM + ".0.0";
  } else if (isX(fp)) {
    from = ">=" + fM + "." + fm + ".0";
  } else {
    from = ">=" + from;
  }
  if (isX(tM)) {
    to = "";
  } else if (isX(tm)) {
    to = "<" + (+tM + 1) + ".0.0";
  } else if (isX(tp)) {
    to = "<" + tM + "." + (+tm + 1) + ".0";
  } else if (tpr) {
    to = "<=" + tM + "." + tm + "." + tp + "-" + tpr;
  } else {
    to = "<=" + to;
  }
  return (from + " " + to).trim();
}
export function satisfies(version, range, optionsOrLoose) {
  try {
    range = new Range(range, optionsOrLoose);
  } catch (er) {
    return false;
  }
  return range.test(version);
}
export function maxSatisfying(versions, range, optionsOrLoose) {
  var max = null;
  var maxSV = null;
  try {
    var rangeObj = new Range(range, optionsOrLoose);
  } catch (er) {
    return null;
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      if (!max || (maxSV && maxSV.compare(v) === -1)) {
        max = v;
        maxSV = new SemVer(max, optionsOrLoose);
      }
    }
  });
  return max;
}
export function minSatisfying(versions, range, optionsOrLoose) {
  var min = null;
  var minSV = null;
  try {
    var rangeObj = new Range(range, optionsOrLoose);
  } catch (er) {
    return null;
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      if (!min || minSV.compare(v) === 1) {
        min = v;
        minSV = new SemVer(min, optionsOrLoose);
      }
    }
  });
  return min;
}
export function minVersion(range, optionsOrLoose) {
  range = new Range(range, optionsOrLoose);
  var minver = new SemVer("0.0.0");
  if (range.test(minver)) {
    return minver;
  }
  minver = new SemVer("0.0.0-0");
  if (range.test(minver)) {
    return minver;
  }
  minver = null;
  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i];
    comparators.forEach((comparator) => {
      var compver = new SemVer(comparator.semver.version);
      switch (comparator.operator) {
        case ">":
          if (compver.prerelease.length === 0) {
            compver.patch++;
          } else {
            compver.prerelease.push(0);
          }
          compver.raw = compver.format();
        case "":
        case ">=":
          if (!minver || gt(minver, compver)) {
            minver = compver;
          }
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error("Unexpected operation: " + comparator.operator);
      }
    });
  }
  if (minver && range.test(minver)) {
    return minver;
  }
  return null;
}
export function validRange(range, optionsOrLoose) {
  try {
    if (range === null) {
      return null;
    }
    return new Range(range, optionsOrLoose).range || "*";
  } catch (er) {
    return null;
  }
}
export function ltr(version, range, optionsOrLoose) {
  return outside(version, range, "<", optionsOrLoose);
}
export function gtr(version, range, optionsOrLoose) {
  return outside(version, range, ">", optionsOrLoose);
}
export function outside(version, range, hilo, optionsOrLoose) {
  version = new SemVer(version, optionsOrLoose);
  range = new Range(range, optionsOrLoose);
  let gtfn;
  let ltefn;
  let ltfn;
  let comp;
  let ecomp;
  switch (hilo) {
    case ">":
      gtfn = gt;
      ltefn = lte;
      ltfn = lt;
      comp = ">";
      ecomp = ">=";
      break;
    case "<":
      gtfn = lt;
      ltefn = gte;
      ltfn = gt;
      comp = "<";
      ecomp = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (satisfies(version, range, optionsOrLoose)) {
    return false;
  }
  for (let i = 0; i < range.set.length; ++i) {
    const comparators = range.set[i];
    let high = null;
    let low = null;
    for (let comparator of comparators) {
      if (comparator.semver === ANY) {
        comparator = new Comparator(">=0.0.0");
      }
      high = high || comparator;
      low = low || comparator;
      if (gtfn(comparator.semver, high.semver, optionsOrLoose)) {
        high = comparator;
      } else if (ltfn(comparator.semver, low.semver, optionsOrLoose)) {
        low = comparator;
      }
    }
    if (high === null || low === null) {
      return true;
    }
    if (high.operator === comp || high.operator === ecomp) {
      return false;
    }
    if (
      (!low.operator || low.operator === comp) &&
      ltefn(version, low.semver)
    ) {
      return false;
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false;
    }
  }
  return true;
}
export function prerelease(version, optionsOrLoose) {
  var parsed = parse(version, optionsOrLoose);
  return parsed && parsed.prerelease.length ? parsed.prerelease : null;
}
export function intersects(range1, range2, optionsOrLoose) {
  range1 = new Range(range1, optionsOrLoose);
  range2 = new Range(range2, optionsOrLoose);
  return range1.intersects(range2);
}
export function coerce(version, optionsOrLoose) {
  if (version instanceof SemVer) {
    return version;
  }
  if (typeof version !== "string") {
    return null;
  }
  const match = version.match(re[COERCE]);
  if (match == null) {
    return null;
  }
  return parse(
    match[1] + "." + (match[2] || "0") + "." + (match[3] || "0"),
    optionsOrLoose,
  );
}
export default SemVer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZCQSxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBRyxPQUFPLENBQUM7QUFFM0MsTUFBTSxVQUFVLEdBQVcsR0FBRyxDQUFDO0FBRy9CLE1BQU0seUJBQXlCLEdBQVcsRUFBRSxDQUFDO0FBRzdDLE1BQU0sRUFBRSxHQUFhLEVBQUUsQ0FBQztBQUN4QixNQUFNLEdBQUcsR0FBYSxFQUFFLENBQUM7QUFDekIsSUFBSSxDQUFDLEdBQVcsQ0FBQyxDQUFDO0FBUWxCLE1BQU0saUJBQWlCLEdBQVcsQ0FBQyxFQUFFLENBQUM7QUFDdEMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsYUFBYSxDQUFDO0FBQ3ZDLE1BQU0sc0JBQXNCLEdBQVcsQ0FBQyxFQUFFLENBQUM7QUFDM0MsR0FBRyxDQUFDLHNCQUFzQixDQUFDLEdBQUcsUUFBUSxDQUFDO0FBTXZDLE1BQU0sb0JBQW9CLEdBQVcsQ0FBQyxFQUFFLENBQUM7QUFDekMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLEdBQUcsNEJBQTRCLENBQUM7QUFLekQsTUFBTSxXQUFXLEdBQVcsQ0FBQyxFQUFFLENBQUM7QUFDaEMsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDbkMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksR0FBRyxRQUFRLEdBQUcsUUFBUSxHQUFHLEdBQUcsQ0FBQztBQUVwRCxNQUFNLGdCQUFnQixHQUFXLENBQUMsRUFBRSxDQUFDO0FBQ3JDLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ3pDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksSUFBSSxRQUFRLElBQUksUUFBUSxJQUFJLEdBQUcsQ0FBQztBQUs1RCxNQUFNLG9CQUFvQixHQUFXLENBQUMsRUFBRSxDQUFDO0FBQ3pDLEdBQUcsQ0FB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
