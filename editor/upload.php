<?
    isset($_POST["body"]) {
        $directory = "./floorplans";
        $filecount = 0;
        $files = glob($directory . "*");
        if ($files) {
            $filecount = count($files);
        }

        file_put_contents("floorplan_" + $filecount + ".json", $_POST["body"]);
    }
?>