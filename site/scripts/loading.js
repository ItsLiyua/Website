function preload(url) {
    const ln = document.createElement('link')
    ln.rel = 'prefetch'
    ln.href = url
    document.head.appendChild(ln)
}

document.title = "Voxel Games"
// Assets to prefetch
assets = [
    'assets/images/background/screenshot_1.png',
    'assets/images/background/screenshot_2.png',
    'assets/images/background/screenshot_3.png',
    'assets/images/background/screenshot_4.png',
    'https://assets.rockpapershotgun.com/images/2019/08/Minecraft-shaders-1.14-Sildurs-Vibrant-Shaders.png',
    'https://img.itch.zone/aW1hZ2UvNDQyNDUxLzIyMjc3OTYucG5n/original/fu2Fq0.png',
    'https://3875234439-files.gitbook.io/~/files/v0/b/gitbook-legacy-files/o/assets%2F-LAK9UyzFQ1YYLFNUZNX%2F-LAKB-DQUH1vdJpebr5H%2F-LAKBFu4LUtHCyeKoQXu%2Frendering_pipeline_2.png?generation=1523995206169029&alt=media',
    'https://3.bp.blogspot.com/-UpMvCvSWeCU/Uz55CMe3kgI/AAAAAAAAAc4/tpqRQWgR17Y/s1600/voxel.jpg',
    'https://www.ednasia.com/wp-content/uploads/sites/3/2020/04/EDNA_voxel_01.jpg']

const icon = document.createElement('link');
icon.rel = 'icon'
icon.href = 'assets/images/favicon.png'
document.head.appendChild(icon)

// Prefetching assets
for (const a of assets) preload(a)
