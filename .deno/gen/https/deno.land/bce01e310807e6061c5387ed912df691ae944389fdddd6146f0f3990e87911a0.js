export class YAMLError extends Error {
  mark;
  constructor(message = "(unknown reason)", mark = "") {
    super(`${message} ${mark}`);
    this.mark = mark;
    this.name = this.constructor.name;
  }
  toString(_compact) {
    return `${this.name}: ${this.message} ${this.mark}`;
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxNQUFNLE9BQU8sU0FBVSxTQUFRLEtBQUs7SUFHdEI7SUFGWixZQUNFLE9BQU8sR0FBRyxrQkFBa0IsRUFDbEIsT0FBc0IsRUFBRTtRQUVsQyxLQUFLLENBQUMsR0FBRyxPQUFPLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztRQUZsQixTQUFJLEdBQUosSUFBSSxDQUFvQjtRQUdsQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBQ3BDLENBQUM7SUFFTSxRQUFRLENBQUMsUUFBaUI7UUFDL0IsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEQsQ0FBQztDQUNGIn0=
