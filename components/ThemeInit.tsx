export default function ThemeInit() {
	return (
		<script
			id="theme-init"
			dangerouslySetInnerHTML={{
				__html: `
        (function () {
          try {
            var stored = localStorage.getItem("theme");
            if (stored === "light" || stored === "dark" || stored === "matrix") {
              document.documentElement.setAttribute("data-theme", stored);
              return;
            }
            if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
              document.documentElement.setAttribute("data-theme", "dark");
            }
          } catch (e) {}
        })();
      `,
			}}
		/>
	);
}
