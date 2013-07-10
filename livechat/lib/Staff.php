<?php

/**
 * Staff Class, OS Livechat
 * @author Frank Houweling <houweling.frank@gmail.com
 * @version Beta 0.1
 */
class Staff extends User {

    public $id;

    public function __construct($id) {
        $this->id = $id;
    }

    // Statics..

    /**
     *
     * Get an existing session
     * @param array session
     * @return boolean|Client
     *
     */
    public static function getById($id) {
        return new Staff($id);
    }

}

?>