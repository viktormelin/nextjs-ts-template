import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/@tabler/icons@latest/iconfont/tabler-icons.min.css' />
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' />
				<link
					href='https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap'
					rel='stylesheet'
				/>
				<link rel='shortcut icon' href='/favicon.png' type='image/x-icon' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
