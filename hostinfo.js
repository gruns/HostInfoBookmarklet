//
// Host Info Bookmarklet - Lookup the host info of any page element
//
// Ansgar Grunseid
// grunseid.com
// grunseid@gmail.com
//
// License: Unlicense
//

//
// To create the bookmarklet, run this code through
//
//   https://chriszarate.github.io/bookmarkleter/
//
// then copy the generated output into the bookmarklet.
//

;(() => {
    const cl = console.log

    async function resolveIpAddressOfUrl (url) {
        const hostname = new URL(url).hostname
        const dnsLookupUrl = `https://api.exana.io/dns/${hostname}/a`

        const resp = await fetch(dnsLookupUrl)
        const js = await resp.json()

        for (let answer of js.answer) {
            if (answer.type === 'A') {
                ipv4 = answer.rdata
                break
            }
        }

        return ipv4 || null
    }

    async function getHostInfoOfIpAddress (ipv4) {
        const hostInfoLookupUrl = `https://ipinfo.io/${ipv4}/json`
        const resp = await fetch(hostInfoLookupUrl)
        const js = await resp.json()

        cl(js)

        return {
            owner: js.org,
            hostname: js.hostname,
            location: js.city ? `${js.city}, ${js.country}` : `${js.country}`,
        }
    }

    function setCursor (value) {
        Object.assign(document.body.style, {cursor: value})
    }

    function showHostInfo (url, hostInfo) {
        let content = null
        if (!hostInfo) {
            content = (
                'Failed to find an asset. Is the selected element an <iframe>?')
        } else {
            content = (
                '\n'+
                `${url}\n`+
                '\n'+
                `Location: ${hostInfo.location}\n`+
                `Hostname: ${hostInfo.hostname}\n`+
                `Owner: ${hostInfo.owner}\n`)
        }

        alert(content)

        /*
        const params = (
            'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,'+
            'menubar=no,width=400,height=400')
        const $page = window.open(null, null, params)
        $page.document.write(content)
        */
    }

    function extractSourceFrom ($ele) {
        let src = null
        const $imgChildren = $ele.getElementsByTagName('img')
        const $videoChildren = $ele.getElementsByTagName('video')
        const style = $ele.currentStyle || window.getComputedStyle($ele, false)

        if (['img', 'video'].includes($ele.tagName.toLowerCase())) {
            src = $ele.src
        } else if ($imgChildren.length > 0) {
            src = $imgChildren[0].src
        } else if ($videoChildren.length > 0) {
            src = $videoChildren[0].src
        } else if ('backgroundImage' in style && style.backgroundImage) {
            src = style.backgroundImage.slice(4, -1).replace(/\"/g, '')
        } else {
            for (let $child of $ele.children.length) {
                src = extractSourceFrom($child) // Recurse.
                if (src)
                    break
            }
        }

        return src
    }

    // Taken and modified from:
    //   https://makandracards.com/makandra/46962-javascript-bookmarklet-to-click-an-element-and-copy-its-text-contents
    function createOverlay () {
        const $overlay = document.createElement('div')
        Object.assign($overlay.style, {
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            position: 'fixed',

            zIndex: 99999999,
            cursor: 'crosshair',

            opacity: 0.2,
            background: '#000',
        })
        document.body.append($overlay)

        return $overlay;
    }

    function chooseElement ($overlay) {
        return new Promise((resolve, reject) => {
            $overlay.addEventListener('click', event => {
                // Temporarily hide the overlay so document.elementFromPoint()
                // doesn't just find the overlay immediately.
                Object.assign($overlay.style, { width: 0, height: 0, })

                const $ele = document.elementFromPoint(
                    event.clientX, event.clientY)
                const position = $ele.getBoundingClientRect()

                // Restore the overlay to show the progress cursor.
                Object.assign($overlay.style, {
                    width: '100vw',
                    height: '100vh',
                    cursor: 'progress',
                })

                setTimeout(() => {
                    resolve($ele)
                })
            })
        })
    }

    ;(async () => {
        const $overlay = createOverlay()
        try {
            const $ele = await chooseElement($overlay)
            const url = extractSourceFrom($ele)

            let hostInfo = null
            const ipv4 = await resolveIpAddressOfUrl(url)
            if (ipv4)
                hostInfo = await getHostInfoOfIpAddress(ipv4)

            showHostInfo(url, hostInfo)
        } catch (err) {
            alert(err)
            throw err
        } finally {
            $overlay.parentNode.removeChild($overlay)
        }
    })()
})()