<template>
	<div>
		<nav-appbar :pname="pageName" />
		<!-- <location /> -->
		<mailer />
	</div>
</template>

<script>
export default {
	name: 'Home',
	data: () => ({
		pageName: 'עמוד הבית'
	}),
	components: {
		'nav-appbar': require('@/components/Global/AppBar').default,
		location: require('@/components/Tools/Places').default,
		mailer: require('@/components/Tools/MailerJet').default
	}
}
</script>
