<?php

/**
 * Controller, Action Start Session, OS Livechat
 * @author Frank Houweling <houweling.frank@gmail.com
 * @version Beta 0.1
 */
if ($client->getLastMessages() == false) {
    echo "<span style='display:block;background-color:#c0d9ff;font-size:11px;padding:3px;'>" . translate("welcome", $client->lang) . "</span>";
} else {
    echo "There were messages send.";
}
?>