export default function ThemeInit() {
	return (
		<script
			id="theme-init"
			dangerouslySetInnerHTML={{
				__html: `
        (function () {
          try {
            var stored = localStorage.getItem("theme");
            var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
            if (stored === "light" || stored === "dark" || stored === "matrix") {
              document.documentElement.setAttribute("data-theme", stored);
              return;
            }
            if (stored === "system") {
              document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
              return;
            }
            document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
          } catch (e) {}
        })();
      `,
			}}
		/>
	);
}
