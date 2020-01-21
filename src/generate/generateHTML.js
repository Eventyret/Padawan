export async function generateHTML(config) {
  const head = `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
	<link rel="stylesheet" href="assets/css/style.css">
	<title>${config.name}</title>
  </head>
  `;
  // prettier-ignore
  const extra = config.clean ? ''  : `
  <main className="container">
	<section className="row">
		<div className="col-12">
			<img src="https://i.imgur.com/WuYuJu5.png" class="img-fluid mx-auto d-block" alt="Padwan tool"/>
			<h2 class="text-center">Thank you for using the Padwan tool to setup your <b>${config.name}</b> Project</h2>
		</div>
	</section>
</main>
  `;

  const html = `
  ${head}
  <body>
  ${extra}
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/js/bootstrap.min.js"></script>
</body>

</html>`;

  return html;
}
