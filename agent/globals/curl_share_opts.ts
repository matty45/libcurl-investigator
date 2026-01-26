// Copied from https://raw.githubusercontent.com/masroore/CurlSharp/refs/heads/master/CurlSharp/Enums/CurlShareOption.cs

/**
*     A member of this enumeration is passed to the function
*     <see cref="CurlShare.SetOpt" /> to configure a <see cref="CurlShare" />
*     transfer.
*/
export enum CurlShareOptions {
    /**
    *     Start-of-enumeration; do not use in application code.
    */
    None = 0,

    /**
    *     The parameter, which should be a member of the
    *     <see cref="CurlLockData" /> enumeration, specifies a type of
    *     data that should be shared.
    */
    Share = 1,

    /**
    *     The parameter, which should be a member of the
    *     <see cref="CurlLockData" /> enumeration, specifies a type of
    *     data that should be unshared.
    */
    Unshare = 2,

    /**
    *     The parameter should be a reference to a
    *     <see cref="CurlShare.CurlShareLockCallback" /> delegate.
    */
    LockFunction = 3,

    /**
    *     The parameter should be a reference to a
    *     <see cref="CurlShare.CurlShareUnlockCallback" /> delegate.
    */
    UnlockFunction = 4,

    /**
    *     The parameter allows you to specify an object reference that
    *     will passed to the <see cref="CurlShare.CurlShareLockCallback" /> delegate and
    *     the <see cref="CurlShare.CurlShareUnlockCallback" /> delegate.
    */
    UserData = 5,

    /**
    *     End-of-enumeration; do not use in application code.
    */
    Last = 6
}