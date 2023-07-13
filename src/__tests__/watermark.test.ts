import { genWaterMark } from "../index";

test("watermark", () => {
  expect(genWaterMark({ content: ["水印"] }));
})