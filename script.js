
				{
					__sveltekit_d7hf91 = {
						base: new URL(".", location).pathname.slice(0, -1),
						env: {}
					};

					const element = document.currentScript.parentElement;

					const data = [null,null];

					Promise.all([
						import("./app/immutable/entry/start.30376c3e.js"),
						import("./app/immutable/entry/app.7d8259ef.js")
					]).then(([kit, app]) => {
						kit.start(app, element, {
							node_ids: [0, 2],
							data,
							form: null,
							error: null
						});
					});
				}
			