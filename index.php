<?php
require 'inc/calfileparser.php';
require 'inc/ical.php';
require 'inc/header.php';
?>

<!DOCTYPE html>
<html class="no-js" lang="nl" >

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Fontys Rooster</title>


  <link rel="stylesheet" href="css/foundation.min.css">
  <link rel="stylesheet" href="css/style.css">

</head>
<body>
  <div class="row">
    <div class="small-15 columns">
      <div class="header">
        <?php if (!empty($_GET['klas'])) : ?>
          Klas <?php echo $klasHuman ?> &ndash;
        <?php endif; ?>
        Week <?php echo $weeknr ?>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="small-15 large-5 columns">
      <a href="rooster.php?klas=<?php echo $klasOrig ?>&week=<?php echo $weeknr_vorige ?>" class="button alert vorige-week js-week">&laquo; Vorige week</a>
    </div>
    <div class="small-15 large-5 text-center-large columns">
      <a href="rooster.php?klas=<?php echo $klasOrig ?>&week=<?php echo $weeknr_huidig ?>" class="button huidige-week js-week">Huidige week</a>
    </div>
    <div class="small-15 large-5 columns">
      <a href="rooster.php?klas=<?php echo $klasOrig ?>&week=<?php echo $weeknr_volgende ?>" class="button success volgende-week js-week">Volgende week &raquo;</a>
    </div>
  </div>
  <div class="row">
    <div class="small-15 columns">
      <?php if (empty($_GET['klas'])) : ?>
        <h3>Klas</h3>
        <input type="text" value="" placeholder="Vul een of meerdere klassen in (puntkommmagescheiden)" class="js-klas">
      <?php endif; ?>
      <div class="hetrooster">
        <?php require('rooster.php') ?>
      </div>
    </div>
  </div>

  <footer>
    <p>
      &copy; <a href="http://webduck.nl">Kees Kluskens</a>
    </p>
  </footer>

  <script src="js/vendor/jquery.js"></script>
  <script src="js/general.js"></script>
</body>
</html>
