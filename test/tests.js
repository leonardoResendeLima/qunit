// QUnit.test("Somar 1 e 2 e ser igual a 3", function (assert) {
// 	assert.ok(sum(1, 2) === 3);
// });

// QUnit.test("Expect - How many assertions are expected", function (assert) {
// 	assert.expect(2);

// 	function calc(x, operation) {
// 		return operation(x);
// 	}

// 	var result = calc(2, function (x) {
// 		assert.ok(true, "calc() calls operation function");
// 		return x * x;
// 	});

// 	assert.equal(result, 4, "2 squared equals 4");
// });

// QUnit.module("grouped tests argument hooks", function (hooks) {

// 	// You can invoke the hooks methods more than once.
// 	hooks.beforeEach(function (assert) {
// 		assert.ok(true, "beforeEach called");
// 	});

// 	hooks.afterEach(function (assert) {
// 		assert.ok(true, "afterEach called");
// 	});

// 	QUnit.test("call hooks", function (assert) {
// 		assert.expect(2);
// 	});

// 	QUnit.module("stacked hooks", function (hooks) {

// 		// This will run after the parent module's beforeEach hook
// 		hooks.beforeEach(function (assert) {
// 			assert.ok(true, "nested beforeEach called");
// 		});

// 		// This will run before the parent module's afterEach
// 		hooks.afterEach(function (assert) {
// 			assert.ok(true, "nested afterEach called");
// 		});

// 		QUnit.test("call hooks", function (assert) {
// 			assert.expect(4);
// 		});
// 	});
// });