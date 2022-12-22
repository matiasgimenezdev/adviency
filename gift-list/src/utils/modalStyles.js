const modalStyles = {
	content: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		gap: '2rem',
		height: '80vh',
		width: '80vw',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		backgroundImage:
			"url('https://images.unsplash.com/photo-1606310737718-01c223c7425b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2hpdGUlMjBjaHJpc3RtYXN8ZW58MHx8MHx8&w=1000&q=80')",
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		fontSize: '2rem',
	},
	overlay: { zIndex: 1000 },
};

export { modalStyles };
