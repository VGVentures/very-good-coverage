const process = require("process");
const cp = require("child_process");
const path = require("path");
const { fail } = require("assert");

test("invalid LCOV format throws an error", () => {
  const lcovPath = "./fixtures/lcov.error.info";
  process.env["INPUT_PATH"] = lcovPath;
  const ip = path.join(__dirname, "index.js");
  try {
    cp.execSync(`node ${ip}`, { env: process.env }).toString();
    fail('this code should fail');
  } catch (err) {
    expect(err).toBeDefined();
  }
});

test("completes when the coverage is 100 and min_coverage is not provided", () => {
  const lcovPath = "./fixtures/lcov.100.info";
  process.env["INPUT_PATH"] = lcovPath;
  const ip = path.join(__dirname, "index.js");
  cp.execSync(`node ${ip}`, { env: process.env }).toString();
});

test("fails when the coverage is not 100 and min_coverage is not provided", () => {
  const lcovPath = "./fixtures/lcov.95.info";
  process.env["INPUT_PATH"] = lcovPath;
  const ip = path.join(__dirname, "index.js");
  try {
    cp.execSync(`node ${ip}`, { env: process.env }).toString();
    fail('this code should fail');
  } catch (err) {
    expect(err).toBeDefined();
  }
});

test("completes when the coverage is above the given min_threshold", () => {
  const lcovPath = "./fixtures/lcov.95.info";
  const minCoverage = 80;
  process.env["INPUT_PATH"] = lcovPath;
  process.env["INPUT_MIN_COVERAGE"] = minCoverage;
  const ip = path.join(__dirname, "index.js");
  cp.execSync(`node ${ip}`, { env: process.env }).toString();
});

test("fails when the coverage is below the given min_threshold", () => {
  const lcovPath = "./fixtures/lcov.95.info";
  const minCoverage = 98;
  process.env["INPUT_PATH"] = lcovPath;
  process.env["INPUT_MIN_COVERAGE"] = minCoverage;
  const ip = path.join(__dirname, "index.js");
  try {
    cp.execSync(`node ${ip}`, { env: process.env }).toString();
    fail('this code should fail');
  } catch (err) {
    expect(err).toBeDefined();
  }
});