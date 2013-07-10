<?php

/**
 * Router, OS Livechat
 * @author Frank Houweling <houweling.frank@gmail.com
 * @version Beta 0.1
 */

require_once "lib/User.php";
require_once "lib/Client.php";
require_once "lib/Staff.php";
require_once "lib/Conversation.php";
require_once "lib/db.php";
require_once "lib/translations.php";
require_once "lib/messagesset.php";
require_once "lib/message.php";

session_start();
$client = Client::getBySession();
$client->setLang($_POST['lang']);

if (isset($_GET['action']))
    $action = $_GET['action'];

else
    $action = "ping"; // Return a ping signal

if (in_array($action, array("bgChecker", "sendMessage", "getNewMessages"))) {
    if ($client->inConversation()) {
        echo "0-";
    } else {
        echo "1-";
    }
}

switch ($action) {
    case "startSession":
        require_once "actions/startSession.inc.php";
        break;
    case "getStaffPartner":
        echo "<span>U wordt nu geholpen door <strong>Frank</strong></span>";
        break;
    case "ping":
        echo "OS Livechat up and running...";
        break;
    case "endses":
        session_destroy();
        echo "Session data destroyed.";
        break;
    case "bgChecker":

        if (!isset($_SESSION['lastaction'])) {
            $lastaction = 0;
        } else {
            $lastaction = $_SESSION['lastaction'];
        }

        if (count($client->activeConversation->getMessages()->after((float) $lastaction)) > 0) {
            echo "Frank";
        } else {
            echo "false";
        }
        break;
    case "sendMessage":
        $client->sendMessage($_POST['message']);
        echo htmlentities($_POST['message'], ENT_COMPAT, 'UTF-8');
        break;
    case "getNewMessages":
        $since = (float) $_POST['since'];

        if ($since == 0)
            ;
        echo "<span style='color:#999;'>";

        $messages = $client->activeConversation->getMessages()->after($since);
        foreach ($messages as $m) {
            echo $m . "</span></p><p><span style='color:#999;'>";
        }

        if ($since == 0)
            ;
        echo "</span>";
        
        break;
}

$_SESSION['lastaction'] = time();
?>