class SocketUtils {
    static getUserNamespace(handle) {
        return `/socket/user/${handle}`;
    }
}

export {SocketUtils}


//runs in both server and client-- universal js ; part of bundle so doesn't run from same file 