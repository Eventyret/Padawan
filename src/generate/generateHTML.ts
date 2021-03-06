
/**
 * This will generate the html for Milestone 1 and Milestone 2
 * @param {UserOptions} config - Configuration options
 * @returns {Promise<String>} Customized HTML 5 Boiler template
 */
export async function generateHTML(config: UserOptions): Promise<string> {
  const script = config.template.js  ? `<script src="assets/js/app.js"></script>`: '';
  const head = `<!DOCTYPE html>
  <html lang="en">
  <head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css">
	<link rel="stylesheet" href="assets/css/style.css">
	<title>${config.name}</title>
  </head>
  `;
  // prettier-ignore
  const extra = config.clean ? ''  : `
  <main class="container">
	<section class="row">
		<div class="col-12">
			<img src="https://upload.wikimedia.org/wikipedia/en/d/d7/Ahsoka_Tano.png" class="img-fluid mx-auto d-block" alt="Padwan tool"/>
			<h2 class="text-center">Thank you for using the Padwan tool to setup your <b>${config.name}</b> Project</h2>
		</div>
	</section>
</main>
  `;

  const html = `${head}
  <body>
  ${extra}
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.slim.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.1/umd/popper.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js"></script>
  ${script}
</body>
</html>`;

  return html;
}
