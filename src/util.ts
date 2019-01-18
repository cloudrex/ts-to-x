export default abstract class Util {
    public static tabs(depth: number): string {
        const result: string[] = [];

        for (let i: number = 0; i < depth; i++) {
            result.push("\t");
        }

        return result.join("");
    }
}
