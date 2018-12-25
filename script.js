 <script>
 
    var map = Array();
    var inf = Array();
    var move_color = "white";
    var move_from_x;
    var move_from_y;


    function init_map () 
    {
        map = 
        [   /*y0  y1   y2 y3 y4  y5  y6  y7 */
            ["R","P", "","", "","", "p","r"], /* x = 0 */
            ["N","P", "","", "","", "p","n"], /* x = 1 */
            ["B","P", "","", "","", "p","b"], /* x = 2 */
            ["Q","P", "","", "","", "p","q"], /* x = 3 */
            ["K","P", "","", "","", "p","k"], /* x = 4 */
            ["B","P", "","", "","", "p","b"], /* x = 5 */
            ["N","P", "","", "","", "p","n"], /* x = 6 */
            ["R","P", "","", "","", "p","r"]  /* x = 7 */

        ];
    }
   
    function init_inf ()
    {
        inf = 
        [
           [" "," "," "," "," "," "," "," "],
           [" "," "," "," "," "," "," "," "],
           [" "," "," "," "," "," "," "," "],
           [" "," "," "," "," "," "," "," "],
           [" "," "," "," "," "," "," "," "],
           [" "," "," "," "," "," "," "," "],
           [" "," "," "," "," "," "," "," "],
           [" "," "," "," "," "," "," "," "]
        ];
    }

    function can_move(sx, sy, dx, dy)
    {
        if(!can_move_from (sx, sy))
            return false;
        if(!can_move_to(dx, dy))
            return false;
        if(!is_correct_move(sx, sy, dx, dy))
            return false;
        return true;
    }

    function is_correct_move(sx, sy, dx, dy)
    {
        var figure = map [sx] [sy];
        if(is_king(figure)) 
        return is_correct_king_move (sx, sy, dx, dy);
        if(is_queen(figure)) 
        return is_correct_queen_move (sx, sy, dx, dy);
        if(is_bishop(figure)) 
        return is_correct_bishop_move (sx, sy, dx, dy);
        if(is_knight(figure)) 
        return is_correct_knight_move (sx, sy, dx, dy);
        if(is_rook(figure)) 
        return is_correct_rook_move (sx, sy, dx, dy);
        if(is_pawn(figure)) 
        return is_correct_pawn_move (sx, sy, dx, dy);
            return true;
    }

    function is_king   (figure){return figure.toUpperCase() == "K";}
    function is_queen  (figure){return figure.toUpperCase() == "Q";}
    function is_bishop (figure){return figure.toUpperCase() == "B";}
    function is_knight (figure){return figure.toUpperCase() == "N";}
    function is_rook   (figure){return figure.toUpperCase() == "R";}
    function is_pawn   (figure){return figure.toUpperCase() == "P";}

    function is_correct_king_move(sx, sy, dx, dy)
    {
        if(Math.abs (dx - sx) <= 1 && Math.abs (dy - sy) <= 1 )
            return true; 
        return false;
    }

     function is_correct_queen_move(sx, sy, dx, dy)
    {
        return true;
    }

     function is_correct_bishop_move(sx, sy, dx, dy)
    {
        return true;
    }

     function is_correct_knight_move(sx, sy, dx, dy)
    {
        if(Math.abs (dx - sx) == 1 && Math.abs (dy - sy) == 2)
        return true;
        if(Math.abs (dx - sx) == 2 && Math.abs (dy - sy) == 1)
            return true;
        return false
    }

     function is_correct_rook_move(sx, sy, dx, dy)
    {
        var delta_x = 0;
        var dalta_y = 0;
        if(dx > sx)  delta_x = +1;
        if (dx < sx) delta_x = -1;
        if (dy > sy) dalta_y = +1;
        if( dy < sy ) dalta_y = -1;
        
        return true;
    }

     function is_correct_pawn_move(sx, sy, dx, dy)
    {
        return true;
    }
    

    function mark_moves_from () 
    { 
        init_inf()
        for( var sx= 0; sx <= 7; sx++)
            for(var sy = 0; sy <= 7; sy++)
                for( var dx= 0; dx <= 7; dx++)
                    for(var dy = 0; dy <= 7; dy++)
                        if(can_move(sx, sy, dx, dy))
                        inf [sx] [sy] = 1;
    }

    function mark_moves_to () 
    { 
        init_inf()
        for( var x= 0; x <= 7; x++)
        for(var y = 0; y <= 7; y++)
        if(can_move(move_from_x, move_from_y, x , y))
        inf [x] [y] = 2;
    }
    
    function can_move_from (x, y)
    {
        return get_color(x, y) == move_color;
            
    }

    function can_move_to (x, y)
    {
        if(map [x] [y] == " ")
        return true;
        return get_color(x, y) != move_color;
            
    }

    function get_color( x, y)
    {
        var figure = map [x] [y];
        if (figure == "")
        return "";
        return(figure.toUpperCase() == figure) ? "white" : "black";
    }
    function click_box (x, y)
    {
        if(inf[x] [y] == "1")
        click_box_from(x, y);
        if(inf[x] [y] == "2")
        click_box_to(x, y);
    }
    function click_box_from(x, y)
    {
        move_from_x = x;
        move_from_y =y;
        mark_moves_to();
        show_map();
    }

    function click_box_to(x, y)
    {
        map [x] [y] = map [move_from_x] [move_from_y];
         map [move_from_x] [move_from_y] = " ";
        turn_move()
        mark_moves_from();
        show_map();
    }

    function turn_move()
    {
        move_color = move_color == "white" ? "black" : "white";
           

    }

    function figure_to_html (figure)
    {
        switch (figure)
        {
            case "K" : return "&#9812;"; case "k" : return "&#9818;";
            case "Q" : return "&#9813;"; case "q" : return "&#9819;";
            case "R" : return "&#9814;"; case "r" : return "&#9820;";
            case "B" : return "&#9815;"; case "b" : return "&#9821;";
            case "N" : return "&#9816;"; case "n" : return "&#9822;";
            case "P" : return "&#9817;"; case "p" : return "&#9823;";
            default : return "&nbsp;";
        }
    }

    function show_map() { 
        html = "<table border = '1' cellpadding='2' cellspacing='0'>";
        for (var y = 7; y >= 0; y --)
        {
            html += "<tr>";
            html += "<td>&nbsp;" + y + "&nbsp;</td>";
            for( var x= 0; x <= 7; x ++)
            { 
                if(inf [x] [y] ==  " ")
                color = (x + y) % 2 ? "#eeffee" : "#abcdef";

             else
                color = inf [x] [y] == "1" ?  "#aaffaa" : "#ffaaaa";

            
            html += "<td style ='height:50px; width:50px;" + 
            " background-color:"+ color + ";" +
            "text-align: center;" + 
            "font-size: 40px;" +
            "color : #000000;" +
            "'onclick = 'click_box(" + x + "," + y + ");'>";
             html += figure_to_html (map [x] [y]);
             html+="</td>";
            }
            html += "</tr>";
        }
         html += "<tr>";
            html += "<td> &nbsp;</td>";
            for( var x= 0; x <= 7; x ++)
            html += "<td style ='text-align: center;'>" + x + "</td>";
        document.getElementById ("board").innerHTML = html;
    }
    function start()
    { 
     init_map();
     mark_moves_from();
     show_map();
    }
    start();
    </script>