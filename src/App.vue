<template lang="pug">
    header
        nav    
            router-link(:to="{name: 'List'}" data-testid="nav-list" active-class="active") List
            router-link(:to="{name: 'FavouriteList'}" data-testid="nav-favourites" active-class="active") Favourites
    main
        router-view
</template>